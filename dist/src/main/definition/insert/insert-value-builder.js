"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = require("../Database");
const type_util_1 = require("@anyhowstep/type-util");
const expr_operation_1 = require("../expr-operation");
const StringBuilder_1 = require("../StringBuilder");
class InsertValueBuilder {
    constructor(data, db) {
        this.data = data;
        this.db = db;
    }
    ignore(ignore = true) {
        return new InsertValueBuilder(type_util_1.spread(this.data, {
            ignore: ignore
        }), this.db);
    }
    validateRow(row) {
        const table = this.data.table;
        for (let name in row) {
            if (!table.columns.hasOwnProperty(name)) {
                throw new Error(`Unexpected column ${name}; it does not exist on table ${this.data.table.name}`);
            }
            const value = row[name];
            if (value === undefined && !table.data.hasServerDefaultValue.hasOwnProperty(name)) {
                throw new Error(`Expected a value for column ${name}; received undefined`);
            }
            //If we specify a value, it better match our assertion
            if (!(value instanceof Object) || (value instanceof Date)) {
                row[name] = table.columns[name].assertDelegate(name, value);
            }
        }
    }
    value(row) {
        this.validateRow(row);
        return new InsertValueBuilder(type_util_1.spread(this.data, {
            values: (this.data.values == undefined) ?
                [row] :
                this.data.values.concat(row)
        }), this.db);
    }
    values(rows) {
        for (let row of rows) {
            this.validateRow(row);
        }
        return new InsertValueBuilder(type_util_1.spread(this.data, {
            values: (this.data.values == undefined) ?
                rows.slice() :
                this.data.values.concat(rows)
        }), this.db);
    }
    ;
    querify(sb) {
        const columnNames = Object.keys(this.data.table.columns)
            .filter(name => this.data.table.columns.hasOwnProperty(name));
        sb.append("INSERT");
        if (this.data.ignore) {
            sb.append(" IGNORE");
        }
        sb.appendLine(" INTO");
        sb.scope((sb) => {
            sb.append(Database_1.Database.EscapeId(this.data.table.name))
                .appendLine(" (")
                .scope((sb) => {
                //column names
                sb.map(columnNames, (sb, name) => {
                    sb.append(Database_1.Database.EscapeId(name));
                }, ",\n");
            })
                .append(")");
        });
        sb.appendLine("VALUES");
        sb.scope((sb) => {
            if (this.data.values != undefined) {
                sb.map(this.data.values, (sb, values) => {
                    //rows
                    sb.append("(");
                    sb.map(columnNames, (sb, name) => {
                        const value = values[name];
                        if (value === undefined) {
                            if (this.data.table.data.hasServerDefaultValue.hasOwnProperty(name)) {
                                sb.append("DEFAULT");
                            }
                            else {
                                throw new Error(`Expected a value for column ${name}; received undefined`);
                            }
                        }
                        else {
                            sb.append(expr_operation_1.querify(value));
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
    execute() {
        return new Promise((resolve, reject) => {
            this.db.rawQuery(this.getQuery(), undefined, (err, result, _fields) => {
                if (err == undefined) {
                    if (result == undefined) {
                        reject(new Error(`Expected a result`));
                    }
                    else {
                        if (this.data.table.data.autoIncrement == undefined) {
                            resolve(Object.assign({}, result));
                        }
                        else {
                            if (result.insertId == 0) {
                                if (!this.data.ignore) {
                                    throw new Error(`Expected to INSERT a new row, received zero for insertId`);
                                }
                            }
                            resolve(Object.assign({}, result, { [this.data.table.data.autoIncrement.name]: (result.insertId == 0) ?
                                    undefined :
                                    result.insertId }));
                        }
                    }
                }
                else {
                    reject(err);
                }
            });
        });
    }
    ;
}
exports.InsertValueBuilder = InsertValueBuilder;
//# sourceMappingURL=insert-value-builder.js.map