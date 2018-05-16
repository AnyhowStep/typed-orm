import * as d from "../../declaration";
import {Database} from "../Database";
import {spread} from "@anyhowstep/type-util";
import {querify} from "../expr-operation";
import {StringBuilder} from "../StringBuilder";
import {Column} from "../column";

export class InsertSelectBuilder<DataT extends d.AnyInsertSelectBuilderData> implements d.IInsertSelectBuilder<DataT> {
    readonly data : DataT;
    readonly db : Database;

    public constructor (data : DataT, db : Database) {
        this.data = data;
        this.db = db;
    }

    ignore (ignore : boolean=true) {
        return new InsertSelectBuilder(
            spread(
                this.data,
                {
                    ignore : ignore
                }
            ),
            this.db
        ) as any;
    }

    columns<InsertColumnsCallbackT extends d.InsertColumnsCallback<DataT>> (
        columnsCallback : InsertColumnsCallbackT
    ) : d.IInsertSelectBuilder<{
        table : DataT["table"];
        selectBuilder : DataT["selectBuilder"];
        ignore : DataT["ignore"];
        columns : ReturnType<InsertColumnsCallbackT>;
    }> {
        const columns = columnsCallback(this.data.selectBuilder.data.selectReferences);
        for (let name in this.data.table.columns) {
            if (
                this.data.table.columns.hasOwnProperty(name) &&
                columns[name] === undefined &&
                !this.data.table.data.hasServerDefaultValue.hasOwnProperty(name)
            ) {
                throw new Error(`Expected a value for column ${name}; received undefined`);
            }
        }
        return new InsertSelectBuilder(spread(
            this.data,
            {
                columns : columns,
            }
        ), this.db) as any;
    }

    querify (sb : d.IStringBuilder) {
        if (this.data.columns == undefined) {
            throw new Error(`Call columns() first`);
        }
        const columns = this.data.columns;
        const columnNames = Object.keys(columns)
            .filter(name => columns.hasOwnProperty(name));

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
        sb.appendLine("SELECT");
        sb.scope((sb) => {
            sb.map(columnNames, (sb, name) => {
                const raw = columns[name];
                if (raw instanceof Column) {
                    raw.querify(sb);
                } else {
                    sb.append(querify(raw));
                }
            }, ",\n")
        });
        sb.appendLine("FROM (");
        sb.scope((sb) => {
            this.data.selectBuilder.querify(sb);
        })
        sb.append(") AS `tmp`")
        /*sb.appendLine("VALUES");
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
        });*/
    }

    getQuery () {
        const sb = new StringBuilder();
        this.querify(sb);
        return sb.toString();
    }

    execute (
        this : InsertSelectBuilder<{
            table : any,
            selectBuilder : any,
            ignore : any,
            columns : {
                [name : string] : d.AnyColumn
            },
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
