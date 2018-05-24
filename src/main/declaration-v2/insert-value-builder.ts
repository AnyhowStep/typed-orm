import {AnyTable} from "./table";
import {Querify} from "./querify";
import {RawExprNoUsedRef} from "./raw-expr";
import * as mysql from "typed-mysql";
import {AnyColumn} from "./column";
import {StringBuilder} from "./StringBuilder";
import {RawExprUtil} from "./raw-expr";
import {PooledDatabase} from "./PooledDatabase";

export type RawInsertRow<TableT extends AnyTable> = (
    {
        [name in Exclude<
            Extract<keyof TableT["columns"], string>,
            keyof TableT["data"]["hasDefaultValue"] |
            keyof TableT["data"]["isGenerated"]
        >] : RawExprNoUsedRef<ReturnType<TableT["columns"][name]["assertDelegate"]>>
    } &
    {
        [name in Exclude<
            Extract<keyof TableT["data"]["hasDefaultValue"], string>,
            keyof TableT["data"]["isGenerated"]
        >]? : (
            RawExprNoUsedRef<ReturnType<TableT["columns"][name]["assertDelegate"]>>
        )
    }
);

export class InsertValueBuilder<
    TableT extends AnyTable,
    ValuesT extends undefined|(RawInsertRow<TableT>[]),
    InsertModeT extends "IGNORE"|"REPLACE"|"NORMAL"
> implements Querify {
    public constructor (
        readonly table : TableT,
        readonly values : ValuesT,
        readonly insertMode : InsertModeT,
        readonly db : PooledDatabase
    ) {
        
    }

    public ignore () : InsertValueBuilder<
        TableT,
        ValuesT,
        "IGNORE"
    > {
        return new InsertValueBuilder(
            this.table,
            this.values,
            "IGNORE",
            this.db
        );
    }
    public replace () : InsertValueBuilder<
        TableT,
        ValuesT,
        "REPLACE"
    > {
        return new InsertValueBuilder(
            this.table,
            this.values,
            "REPLACE",
            this.db
        );
    }
    private validateRow (row : RawInsertRow<TableT>) {
        for (let name in row) {
            if (!this.table.columns.hasOwnProperty(name)) {
                throw new Error(`Unexpected column ${name}; it does not exist on table ${this.table.alias}`);
            }
            if (this.table.data.isGenerated.hasOwnProperty(name)) {
                throw new Error(`Unexpected column ${name}; it is a generated column on table ${this.table.alias}, you cannot specify a value for it`);
            }
            const value = (row as any)[name];
            if (value === undefined && !this.table.data.hasDefaultValue.hasOwnProperty(name)) {
                throw new Error(`Expected a value for column ${name} on table ${this.table.alias}; received undefined`);
            }
            //If we specify a value, it better match our assertion
            if (!(value instanceof Object) || (value instanceof Date)) {
                (row as any)[name] = this.table.columns[name].assertDelegate(name, value) as any;
            }
        }
    }
    public value (...rows : RawInsertRow<TableT>[]) : InsertValueBuilder<
        TableT,
        RawInsertRow<TableT>[],
        InsertModeT
    > {
        for (let row of rows) {
            this.validateRow(row);
        }

        return new InsertValueBuilder(
            this.table,
            (this.values == undefined) ?
                    rows :
                    (this.values as any).concat(rows),
            this.insertMode,
            this.db
        );
    }

    public execute (
        this : InsertValueBuilder<TableT, RawInsertRow<TableT>[], any>
    ) : (
        Promise<
            mysql.MysqlInsertResult &
            (
                TableT["data"]["autoIncrement"] extends AnyColumn ?
                    //The auto-incremented id
                    {
                        [name in TableT["data"]["autoIncrement"]["name"]] : (
                            //TODO Test and see if REPLACE returns `insertId`
                            "IGNORE" extends InsertModeT ?
                                number|undefined :
                                number
                        )
                    } :
                    //No auto increment
                    {}
            )
        >
    ) {
        if (this.values == undefined) {
            throw new Error(`No VALUES to insert`);
        }
        return this.db.rawInsert(this.getQuery(), {})
            .then((result) => {
                if (this.table.data.autoIncrement == undefined) {
                    return result;
                } else {
                    if (result.insertId == 0) {
                        if (this.insertMode != "IGNORE") {
                            throw new Error(`Expected to INSERT a new row, received zero for insertId`);
                        }
                    }
                    return {
                        ...result,
                        [this.table.data.autoIncrement.name] : (result.insertId == 0) ?
                            undefined :
                            result.insertId,
                    };
                }
            }) as any;
    }

    querify (sb : StringBuilder) {
        const columnNames = Object.keys(this.table.columns)
            .filter(name => this.table.columns.hasOwnProperty(name));

        if (this.insertMode == "REPLACE") {
            sb.appendLine("REPLACE INTO");
        } else if (this.insertMode == "IGNORE") {
            sb.appendLine("INSERT IGNORE INTO");
        } else {
            sb.appendLine("INSERT INTO");
        }

        sb.scope((sb) => {
            sb.append(mysql.escapeId(this.table.name))
            .appendLine(" (")
            .scope((sb) => {
                //column names
                sb.map(columnNames, (sb, name) => {
                    sb.append(mysql.escapeId(name));
                }, ",\n")
            })
            .append(")");
        });
        sb.appendLine("VALUES");
        sb.scope((sb) => {
            if (this.values != undefined) {
                const values = this.values as (RawInsertRow<TableT>[]);
                sb.map(values, (sb, values) => {
                    //rows
                    sb.append("(");
                    sb.map(columnNames, (sb, name) => {
                        const value = (values as any)[name];
                        if (value === undefined) {
                            if (this.table.data.hasDefaultValue.hasOwnProperty(name)) {
                                sb.append("DEFAULT");
                            } else {
                                throw new Error(`Expected a value for column ${name}; received undefined`);
                            }
                        } else {
                            sb.append(RawExprUtil.querify(value));
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
    printQuery () {
        console.log(this.getQuery());
        return this;
    }
}