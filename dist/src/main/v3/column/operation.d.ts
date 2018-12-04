import * as sd from "schema-decorator";
import { IColumn, Column } from "./column";
export declare type ToNullable<ColumnT extends IColumn> = (Column<{
    readonly tableAlias: ColumnT["tableAlias"];
    readonly name: ColumnT["name"];
    readonly assertDelegate: sd.AssertDelegate<null | ReturnType<ColumnT["assertDelegate"]>>;
}>);
export declare function toNullable<ColumnT extends IColumn>({ tableAlias, name, assertDelegate, __subTableName, __isInSelectClause, }: ColumnT): (ToNullable<ColumnT>);
export declare type WithTableAlias<ColumnT extends IColumn, NewTableAliasT extends string> = (ColumnT extends IColumn ? Column<{
    readonly tableAlias: NewTableAliasT;
    readonly name: ColumnT["name"];
    readonly assertDelegate: ColumnT["assertDelegate"];
}> : never);
export declare function withTableAlias<ColumnT extends IColumn, NewTableAliasT extends string>({ name, assertDelegate, __subTableName, __isInSelectClause, }: ColumnT, newTableAlias: NewTableAliasT): (WithTableAlias<ColumnT, NewTableAliasT>);
export declare type WithType<ColumnT extends IColumn, NewAssertDelegateT extends sd.AnyAssertFunc> = (Column<{
    readonly tableAlias: ColumnT["tableAlias"];
    readonly name: ColumnT["name"];
    readonly assertDelegate: sd.ToAssertDelegate<NewAssertDelegateT>;
}>);
export declare function withType<ColumnT extends IColumn, NewAssertFuncT extends sd.AnyAssertFunc>({ tableAlias, name, __subTableName, __isInSelectClause, }: ColumnT, newAssertFunc: NewAssertFuncT): (WithType<ColumnT, NewAssertFuncT>);
//# sourceMappingURL=operation.d.ts.map