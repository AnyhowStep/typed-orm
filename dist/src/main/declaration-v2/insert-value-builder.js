"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("./table");
const mysql = require("typed-mysql");
const StringBuilder_1 = require("./StringBuilder");
const raw_expr_1 = require("./raw-expr");
class InsertValueBuilder {
    constructor(table, values, insertMode, db) {
        this.table = table;
        this.values = values;
        this.insertMode = insertMode;
        this.db = db;
    }
    ignore() {
        return new InsertValueBuilder(this.table, this.values, "IGNORE", this.db);
    }
    replace() {
        return new InsertValueBuilder(this.table, this.values, "REPLACE", this.db);
    }
    value(...rows) {
        table_1.TableUtil.validateInsertRows(this.table, rows);
        return new InsertValueBuilder(this.table, (this.values == undefined) ?
            rows :
            this.values.concat(rows), this.insertMode, this.db);
    }
    execute(db) {
        if (this.values == undefined) {
            throw new Error(`No VALUES to insert`);
        }
        if (db == undefined) {
            db = this.db;
        }
        return db.rawInsert(this.getQuery(), {})
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
    executeAndFetch() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.transaction((db) => __awaiter(this, void 0, void 0, function* () {
                const insertResult = yield this.execute(db);
                return db.fetchOneById(this.table, insertResult.insertId);
            }));
        });
    }
    querify(sb) {
        const columnNames = Object.keys(this.table.columns)
            .filter(name => this.table.columns.hasOwnProperty(name))
            .filter(name => !this.table.data.isGenerated.hasOwnProperty(name));
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
        sb.appendLine("VALUES");
        sb.scope((sb) => {
            if (this.values != undefined) {
                const values = this.values;
                sb.map(values, (sb, values) => {
                    //rows
                    sb.append("(");
                    sb.map(columnNames, (sb, name) => {
                        const value = values[name];
                        if (value === undefined) {
                            if (this.table.data.hasDefaultValue.hasOwnProperty(name)) {
                                sb.append("DEFAULT");
                            }
                            else {
                                throw new Error(`Expected a value for column ${name}; received undefined`);
                            }
                        }
                        else {
                            sb.append(raw_expr_1.RawExprUtil.querify(value));
                        }
                    }, ", ");
                    sb.append(")");
                }, ",\n");
            }
        });
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
exports.InsertValueBuilder = InsertValueBuilder;
//# sourceMappingURL=insert-value-builder.js.map