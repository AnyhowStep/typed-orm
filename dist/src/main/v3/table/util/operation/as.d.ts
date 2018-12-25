import { ITable } from "../../table";
import { AliasedTable } from "../../../aliased-table";
import { ColumnMapUtil } from "../../../column-map";
export declare type As<TableT extends ITable, NewAliasT extends string> = (AliasedTable<{
    readonly usedRef: TableT["usedRef"];
    readonly alias: NewAliasT;
    readonly columns: ColumnMapUtil.WithTableAlias<TableT["columns"], NewAliasT>;
}>);
export declare function as<TableT extends ITable, NewAliasT extends string>({ usedRef, columns, unaliasedQuery, }: TableT, newAlias: NewAliasT): (As<TableT, NewAliasT>);
//# sourceMappingURL=as.d.ts.map