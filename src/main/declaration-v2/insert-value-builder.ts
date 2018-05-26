import {AnyTable, TableUtil} from "./table";
import {Querify} from "./querify";
import {RawExprNoUsedRef} from "./raw-expr";
import * as mysql from "typed-mysql";
import {Column, AnyColumn} from "./column";
import {StringBuilder} from "./StringBuilder";
import {RawExprUtil} from "./raw-expr";
import {PooledDatabase} from "./PooledDatabase";
import {FetchRow} from "./fetch-row";
import {SelectBuilderUtil} from "./select-builder-util";
import {SelectCollectionUtil} from "./select-collection";

export type RawInsertValueRow<TableT extends AnyTable> = (
    {
        [name in TableUtil.RequiredColumnNames<TableT>] : (
            RawExprNoUsedRef<ReturnType<TableT["columns"][name]["assertDelegate"]>>
        )
    } &
    {
        [name in TableUtil.OptionalColumnNames<TableT>]? : (
            RawExprNoUsedRef<ReturnType<TableT["columns"][name]["assertDelegate"]>>
        )
    }
);

export class InsertValueBuilder<
    TableT extends AnyTable,
    ValuesT extends undefined|(RawInsertValueRow<TableT>[]),
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
    public value (...rows : RawInsertValueRow<TableT>[]) : InsertValueBuilder<
        TableT,
        RawInsertValueRow<TableT>[],
        InsertModeT
    > {
        TableUtil.validateInsertRows(this.table, rows);

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
        this : InsertValueBuilder<any, any[], any>,
        db? : PooledDatabase
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
        if (db == undefined) {
            db = this.db;
        }
        return db.rawInsert(this.getQuery(), {})
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
    public async executeAndFetch (
        this : InsertValueBuilder<
            TableT extends AnyTable & { data : { autoIncrement : Column<any, any, number> } } ?
                any : never,
            any[],
            any
        >
    ) : (
        Promise<FetchRow<
            SelectBuilderUtil.SelectAll<TableT>["data"]["joins"],
            SelectCollectionUtil.ToColumnReferences<
                SelectBuilderUtil.SelectAll<TableT>["data"]["selects"]
            >
        >>
    ) {
        return this.db.transaction(async (db) => {
            const insertResult = await this.execute(db);
            return db.fetchOneById(this.table, insertResult.insertId);
        }) as any;
    }

    querify (sb : StringBuilder) {
        const columnNames = Object.keys(this.table.columns)
            .filter(name => this.table.columns.hasOwnProperty(name))
            .filter(name => !this.table.data.isGenerated.hasOwnProperty(name));

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
                const values = this.values as (RawInsertValueRow<TableT>[]);
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