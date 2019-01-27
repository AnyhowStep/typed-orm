import { ITable } from "../../table";
import { AliasedTable } from "../../../aliased-table";
import { ColumnMapUtil } from "../../../column-map";
export declare type As<TableT extends ITable, NewAliasT extends string> = (AliasedTable<{
    readonly usedColumns: TableT["usedColumns"];
    readonly alias: NewAliasT;
    readonly columns: ColumnMapUtil.WithTableAlias<TableT["columns"], NewAliasT>;
}>);
export declare function as<TableT extends ITable, NewAliasT extends string>({ usedColumns, columns, unaliasedQuery, }: TableT, newAlias: NewAliasT): (As<TableT, NewAliasT>);
