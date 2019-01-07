import { IColumn, Column } from "../../column";
export declare type WithTableAlias<ColumnT extends IColumn, NewTableAliasT extends string> = (ColumnT extends IColumn ? Column<{
    readonly tableAlias: NewTableAliasT;
    readonly name: ColumnT["name"];
    readonly assertDelegate: ColumnT["assertDelegate"];
}> : never);
export declare function withTableAlias<ColumnT extends IColumn, NewTableAliasT extends string>({ name, assertDelegate, __isFromExprSelectItem, }: ColumnT, newTableAlias: NewTableAliasT): (WithTableAlias<ColumnT, NewTableAliasT>);
//# sourceMappingURL=with-table-alias.d.ts.map