import { AliasedTable, AnyAliasedTable } from "./aliased-table";
import { Column, AnyColumn } from "../column";
import { ColumnCollectionUtil } from "../column-collection";
export declare namespace AliasedTableUtil {
    function convenientFullName(table: AnyAliasedTable): string;
    function assertHasColumn(table: AnyAliasedTable, column: AnyColumn): void;
    function assertHasColumns(table: AnyAliasedTable, arr: AnyColumn[]): void;
    type IsReplaceableBy<TableA extends AnyAliasedTable, TableB extends AnyAliasedTable> = (ColumnCollectionUtil.IsReplaceableBy<TableA["columns"], TableB["columns"]>);
    function isReplaceableBy<TableA extends AnyAliasedTable, TableB extends AnyAliasedTable>(tableA: TableA, tableB: TableB): IsReplaceableBy<TableA, TableB>;
    type As<TableT extends AnyAliasedTable, NewAliasT extends string> = (AliasedTable<NewAliasT, TableT["name"], ColumnCollectionUtil.WithTableAlias<TableT["columns"], NewAliasT>>);
    function as<TableT extends AnyAliasedTable, NewAliasT extends string>(table: TableT, newAlias: NewAliasT): (As<TableT, NewAliasT>);
    type ToGeneric<TableT extends AnyAliasedTable> = (AliasedTable<any, any, {
        [columnName in Extract<keyof TableT["columns"], string>]: (Column<any, columnName, ReturnType<TableT["columns"][columnName]["assertDelegate"]>>);
    }>);
}
