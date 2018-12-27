import { RawExprNoUsedRef } from "../../../raw-expr";
import { ITable, TableUtil } from "../../../table";
import { RequiredColumnNames, OptionalColumnNames } from "../query";
import { IConnection } from "../../../execution";
export declare type InsertRow<TableT extends ITable> = ({
    [name in RequiredColumnNames<TableT>]: (RawExprNoUsedRef<ReturnType<TableT["columns"][name]["assertDelegate"]>>);
} & {
    [name in OptionalColumnNames<TableT>]?: (RawExprNoUsedRef<ReturnType<TableT["columns"][name]["assertDelegate"]>>);
});
export declare type InsertRowLiteral<TableT extends ITable> = ({
    [name in RequiredColumnNames<TableT>]: (ReturnType<TableT["columns"][name]["assertDelegate"]>);
} & {
    [name in OptionalColumnNames<TableT>]?: (ReturnType<TableT["columns"][name]["assertDelegate"]>);
});
export declare function insertAndFetch<TableT extends ITable & {
    insertAllowed: true;
}>(connection: IConnection & TableUtil.AssertHasCandidateKey<TableT>, table: TableT, rawInsertRow: InsertRow<TableT>): Promise<{ readonly [columnName in Extract<keyof TableT["columns"], string>]: ReturnType<TableT["columns"][columnName]["assertDelegate"]>; } | { [columnName in (TableT["columns"] extends import("../../..").ColumnMap ? Extract<keyof TableT["columns"], string> : never) | (TableT["parents"][number]["columns"] extends import("../../..").ColumnMap ? Extract<keyof TableT["parents"][number]["columns"], string> : never)]: { [tableAlias in (TableT | TableT["parents"][number])["alias"]]: columnName extends keyof (Extract<TableT, {
    alias: tableAlias;
}> | Extract<TableT["parents"][number], {
    alias: tableAlias;
}>)["columns"] ? { [otherTableAlias in Exclude<(TableT | TableT["parents"][number])["alias"], tableAlias>]: columnName extends keyof (Extract<TableT, {
    alias: otherTableAlias;
}> | Extract<TableT["parents"][number], {
    alias: otherTableAlias;
}>)["columns"] ? ReturnType<(Extract<TableT, {
    alias: tableAlias;
}> | Extract<TableT["parents"][number], {
    alias: tableAlias;
}>)["columns"][columnName]["assertDelegate"]> extends ReturnType<(Extract<TableT, {
    alias: otherTableAlias;
}> | Extract<TableT["parents"][number], {
    alias: otherTableAlias;
}>)["columns"][columnName]["assertDelegate"]> ? true : false : true; }[Exclude<(TableT | TableT["parents"][number])["alias"], tableAlias>] extends true ? ReturnType<(Extract<TableT, {
    alias: tableAlias;
}> | Extract<TableT["parents"][number], {
    alias: tableAlias;
}>)["columns"][columnName]["assertDelegate"]> : never : never; }[(TableT | TableT["parents"][number])["alias"]]; }>;
//# sourceMappingURL=insert-and-fetch.d.ts.map