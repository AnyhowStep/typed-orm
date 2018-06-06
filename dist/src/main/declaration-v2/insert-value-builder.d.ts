import { AnyTable, TableUtil } from "./table";
import { Querify } from "./querify";
import { RawExprNoUsedRef } from "./raw-expr";
import * as mysql from "typed-mysql";
import { AnyColumn } from "./column";
import { StringBuilder } from "./StringBuilder";
import { PooledDatabase } from "./PooledDatabase";
import { FetchRow } from "./fetch-row";
import { SelectBuilderUtil } from "./select-builder-util";
import { SelectCollectionUtil } from "./select-collection";
import { UniqueKeyCollection } from "./unique-key-collection";
export declare type RawInsertValueRow<TableT extends AnyTable> = ({
    [name in TableUtil.RequiredColumnNames<TableT>]: (RawExprNoUsedRef<ReturnType<TableT["columns"][name]["assertDelegate"]>>);
} & {
    [name in TableUtil.OptionalColumnNames<TableT>]?: (RawExprNoUsedRef<ReturnType<TableT["columns"][name]["assertDelegate"]>>);
});
export declare type InsertLiteralRow<TableT extends AnyTable> = ({
    [name in TableUtil.RequiredColumnNames<TableT>]: (ReturnType<TableT["columns"][name]["assertDelegate"]>);
} & {
    [name in TableUtil.OptionalColumnNames<TableT>]?: (ReturnType<TableT["columns"][name]["assertDelegate"]>);
});
export declare class InsertValueBuilder<TableT extends AnyTable, ValuesT extends undefined | (RawInsertValueRow<TableT>[]), InsertModeT extends "IGNORE" | "REPLACE" | "NORMAL"> implements Querify {
    readonly table: TableT;
    readonly values: ValuesT;
    readonly insertMode: InsertModeT;
    readonly db: PooledDatabase;
    constructor(table: TableT, values: ValuesT, insertMode: InsertModeT, db: PooledDatabase);
    ignore(): InsertValueBuilder<TableT, ValuesT, "IGNORE">;
    replace(): InsertValueBuilder<TableT, ValuesT, "REPLACE">;
    value(...rows: RawInsertValueRow<TableT>[]): InsertValueBuilder<TableT, RawInsertValueRow<TableT>[], InsertModeT>;
    execute(this: InsertValueBuilder<any, any[], any>, db?: PooledDatabase): (Promise<mysql.MysqlInsertResult & {
        insertedRowCount: number;
    } & (TableT["data"]["autoIncrement"] extends AnyColumn ? {
        [name in TableT["data"]["autoIncrement"]["name"]]: ("IGNORE" extends InsertModeT ? number | undefined : number);
    } : {})>);
    executeAndFetch(this: InsertValueBuilder<TableT extends AnyTable & {
        data: {
            uniqueKey: UniqueKeyCollection;
        };
    } ? any : never, any[], any>): (Promise<FetchRow<SelectBuilderUtil.CleanToSelectAll<TableT>["data"]["joins"], SelectCollectionUtil.ToColumnReferences<SelectBuilderUtil.CleanToSelectAll<TableT>["data"]["selects"]>>>);
    querify(sb: StringBuilder): void;
    getQuery(): string;
    printQuery(): this;
}
