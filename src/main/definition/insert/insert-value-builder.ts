import * as d from "../../declaration";
import {Database} from "../Database";
import {spread} from "@anyhowstep/type-util";
import {querify} from "../expr-operation";
import {StringBuilder} from "../StringBuilder";

export class InsertValueBuilder<DataT extends d.AnyInsertValueBuilderData> implements d.IInsertValueBuilder<DataT> {
    readonly data : DataT;
    readonly db : Database;

    public constructor (data : DataT, db : Database) {
        this.data = data;
        this.db = db;
    }

    ignore (ignore : boolean=true) {
        return new InsertValueBuilder(
            spread(
                this.data,
                {
                    ignore : ignore
                }
            ),
            this.db
        ) as any;
    }

    private validateRow (row : d.RawInsertRow<DataT["table"]>) {
        for (let name in this.data.table.columns) {
            if (this.data.table.columns.hasOwnProperty(name)) {
                const value = row[name];
                if (value === undefined) {
                    if (!this.data.table.data.hasServerDefaultValue.hasOwnProperty(name)) {
                        throw new Error(`Expected a value for column ${name}; received undefined`);
                    }
                } else {
                    if (!(value instanceof Object) || (value instanceof Date)) {
                        row[name] = this.data.table.columns[name].assertDelegate(
                            name,
                            value
                        ) as any;
                    }
                }
            }
        }
    }

    value (row : d.RawInsertRow<DataT["table"]>) {
        this.validateRow(row);

        return new InsertValueBuilder(
            spread(
                this.data,
                {
                    values : (this.data.values == undefined) ?
                        [row] :
                        this.data.values.concat(row)
                }
            ),
            this.db
        ) as any;
    }
    values (rows : d.RawInsertRow<DataT["table"]>[]) {
        for (let row of rows) {
            this.validateRow(row);
        }

        return new InsertValueBuilder(
            spread(
                this.data,
                {
                    values : (this.data.values == undefined) ?
                        rows.slice() :
                        this.data.values.concat(rows)
                }
            ),
            this.db
        ) as any;
    };

    querify (sb : d.IStringBuilder) {
        const columnNames = Object.keys(this.data.table.columns)
            .filter(name => this.data.table.columns.hasOwnProperty(name));

        sb.append("INSERT");
        if (this.data.ignore) {
            sb.append(" IGNORE");
        }
        sb.appendLine(" INTO");
        sb.scope((sb) => {
            sb.append(Database.EscapeId(this.data.table.name))
            .appendLine(" (")
            .scope((sb) => {
                //column names
                sb.map(columnNames, (sb, name) => {
                    sb.append(Database.EscapeId(name));
                }, ",\n")
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
                            } else {
                                throw new Error(`Expected a value for column ${name}; received undefined`);
                            }
                        } else {
                            sb.append(querify(value));
                        }
                    }, ", ");
                    sb.append(")");
                }, ",\n");
            }
        });
    }

    getQuery () {
        const sb = new StringBuilder();
        this.querify(sb);
        return sb.toString();
    }

    execute (
        this : InsertValueBuilder<{
            table : any,
            ignore : any,
            values : any[],
        }>
    ) {
        return new Promise((resolve, reject) => {
            this.db.rawQuery(
                this.getQuery(),
                undefined,
                (err, result, _fields) => {
                    if (err == undefined) {
                        if (result == undefined) {
                            reject(new Error(`Expected a result`))
                        } else {
                            if (this.data.table.data.autoIncrement == undefined) {
                                resolve({
                                    ...result,
                                });
                            } else {
                                if (result.insertId == 0) {
                                    if (!this.data.ignore) {
                                        throw new Error(`Expected to INSERT a new row, received zero for insertId`);
                                    }
                                }
                                resolve({
                                    ...result,
                                    [this.data.table.data.autoIncrement.name] : (result.insertId == 0) ?
                                        undefined :
                                        result.insertId,
                                });
                            }

                        }
                    } else {
                        reject(err);
                    }
                }
            );
        }) as any;
    };
}
