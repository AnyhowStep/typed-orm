"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("./table");
const mysql = require("typed-mysql");
const column_1 = require("./column");
const StringBuilder_1 = require("./StringBuilder");
const raw_expr_1 = require("./raw-expr");
const column_references_1 = require("./column-references");
const select_collection_1 = require("./select-collection");
class InsertSelectBuilder {
    constructor(table, selectBuilder, assignments, insertMode, db) {
        this.table = table;
        this.selectBuilder = selectBuilder;
        this.assignments = assignments;
        this.insertMode = insertMode;
        this.db = db;
    }
    ignore() {
        return new InsertSelectBuilder(this.table, this.selectBuilder, this.assignments, "IGNORE", this.db);
    }
    replace() {
        return new InsertSelectBuilder(this.table, this.selectBuilder, this.assignments, "REPLACE", this.db);
    }
    set(delegate) {
        const selectReferences = select_collection_1.SelectCollectionUtil.toColumnReferences(this.selectBuilder.data.selects);
        const assignments = delegate(column_references_1.ColumnReferencesUtil.toConvenient(selectReferences));
        table_1.TableUtil.validateInsertRow(this.table, assignments);
        for (let columnName in assignments) {
            const value = assignments[columnName];
            if (value instanceof Object && !(value instanceof Date)) {
                column_references_1.ColumnReferencesUtil.assertHasColumn(selectReferences, value);
            }
        }
        return new InsertSelectBuilder(this.table, this.selectBuilder, assignments, this.insertMode, this.db);
    }
    execute() {
        if (this.assignments == undefined) {
            throw new Error(`No VALUES to insert`);
        }
        return this.db.rawInsert(this.getQuery(), {})
            .then((result) => {
            if (this.table.data.autoIncrement == undefined) {
                return result;
            }
            else {
                if (result.insertId == 0) {
                    if (this.insertMode != "IGNORE") {
                        throw new Error(`Expected to INSERT a new row, received zero for insertId`);
                    }
                }
                return Object.assign({}, result, { [this.table.data.autoIncrement.name]: (result.insertId == 0) ?
                        undefined :
                        result.insertId });
            }
        });
    }
    querify(sb) {
        if (this.assignments == undefined) {
            throw new Error(`Call set() first`);
        }
        const assignments = this.assignments;
        const columnNames = Object.keys(this.table.columns)
            .filter(name => this.table.columns.hasOwnProperty(name))
            .filter(name => !this.table.data.isGenerated.hasOwnProperty(name))
            .filter(name => assignments[name] !== undefined);
        if (this.insertMode == "REPLACE") {
            sb.appendLine("REPLACE INTO");
        }
        else if (this.insertMode == "IGNORE") {
            sb.appendLine("INSERT IGNORE INTO");
        }
        else {
            sb.appendLine("INSERT INTO");
        }
        sb.scope((sb) => {
            sb.append(mysql.escapeId(this.table.name))
                .appendLine(" (")
                .scope((sb) => {
                //column names
                sb.map(columnNames, (sb, name) => {
                    sb.append(mysql.escapeId(name));
                }, ",\n");
            })
                .append(")");
        });
        sb.appendLine("SELECT");
        sb.scope((sb) => {
            sb.map(columnNames, (sb, name) => {
                const raw = assignments[name];
                if (raw instanceof column_1.Column) {
                    raw.querify(sb);
                }
                else {
                    sb.append(raw_expr_1.RawExprUtil.querify(raw));
                }
            }, ",\n");
        });
        sb.appendLine("FROM (");
        sb.scope((sb) => {
            this.selectBuilder.querify(sb);
        });
        sb.append(") AS `tmp`");
    }
    getQuery() {
        const sb = new StringBuilder_1.StringBuilder();
        this.querify(sb);
        return sb.toString();
    }
    printQuery() {
        console.log(this.getQuery());
        return this;
    }
}
exports.InsertSelectBuilder = InsertSelectBuilder;
//# sourceMappingURL=insert-select-builder.js.map