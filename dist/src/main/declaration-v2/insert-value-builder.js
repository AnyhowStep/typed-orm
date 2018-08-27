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
        if (this.table.data.noInsert) {
            throw new Error(`INSERT not allowed on ${this.table.name}`);
        }
        if (this.values == undefined) {
            throw new Error(`No VALUES to insert`);
        }
        if (db == undefined) {
            db = this.db;
        }
        return db.rawInsert(this.getQuery(), {})
            .then((result) => {
            if (this.table.data.autoIncrement == undefined) {
                return Object.assign({}, result, { insertedRowCount: result.affectedRows });
            }
            else {
                if (result.insertId == 0) {
                    if (this.insertMode != "IGNORE") {
                        throw new Error(`Expected to INSERT a new row, received zero for insertId`);
                    }
                }
                return Object.assign({}, result, { insertedRowCount: result.affectedRows, [this.table.data.autoIncrement.name]: (result.insertId == 0) ?
                        undefined :
                        result.insertId });
            }
        });
    }
    //Consider allowing just ["data"]["id"] for execute and fetch
    executeAndFetch() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.table.data.noInsert) {
                throw new Error(`INSERT not allowed on ${this.table.name}`);
            }
            return this.db.transactionIfNotInOne((db) => __awaiter(this, void 0, void 0, function* () {
                const insertResult = yield this.execute(db);
                if (insertResult.insertId > 0) {
                    //Prefer auto-increment id, if possible
                    return db.fetchOneById(this.table, insertResult.insertId);
                }
                else {
                    //Get the last inserted row
                    const lastRow = Object.assign({}, (this.values[this.values.length - 1]));
                    for (let columnName in lastRow) {
                        const value = lastRow[columnName];
                        if (value === undefined ||
                            ((value instanceof Object) &&
                                !(value instanceof Date))) {
                            delete lastRow[columnName];
                        }
                    }
                    //This may not necessarily work...
                    //It is possible the unique key were entirely Expr<> instances,
                    //making fetching by unique key impossible (for now)
                    return db.fetchOneByUniqueKey(this.table, lastRow);
                }
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