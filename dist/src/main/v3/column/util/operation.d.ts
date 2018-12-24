import * as sd from "schema-decorator";
import { IColumn, Column } from "../column";
import { IExprSelectItem } from "../../expr-select-item";
import { ColumnRefUtil } from "../../column-ref";
export declare type ToNullable<ColumnT extends IColumn> = (ColumnT extends IColumn ? Column<{
    readonly tableAlias: ColumnT["tableAlias"];
    readonly name: ColumnT["name"];
    readonly assertDelegate: sd.AssertDelegate<null | ReturnType<ColumnT["assertDelegate"]>>;
}> : never);
export declare function toNullable<ColumnT extends IColumn>({ tableAlias, name, assertDelegate, __subTableName, __isInSelectClause, }: ColumnT): (ToNullable<ColumnT>);
export declare type WithTableAlias<ColumnT extends IColumn, NewTableAliasT extends string> = (ColumnT extends IColumn ? Column<{
    readonly tableAlias: NewTableAliasT;
    readonly name: ColumnT["name"];
    readonly assertDelegate: ColumnT["assertDelegate"];
}> : never);
export declare function withTableAlias<ColumnT extends IColumn, NewTableAliasT extends string>({ name, assertDelegate, __subTableName, __isInSelectClause, }: ColumnT, newTableAlias: NewTableAliasT): (WithTableAlias<ColumnT, NewTableAliasT>);
export declare type WithType<ColumnT extends IColumn, NewAssertDelegateT extends sd.AnyAssertFunc> = (ColumnT extends IColumn ? Column<{
    readonly tableAlias: ColumnT["tableAlias"];
    readonly name: ColumnT["name"];
    readonly assertDelegate: sd.ToAssertDelegate<NewAssertDelegateT>;
}> : never);
export declare function withType<ColumnT extends IColumn, NewAssertFuncT extends sd.AnyAssertFunc>({ tableAlias, name, __subTableName, __isInSelectClause, }: ColumnT, newAssertFunc: NewAssertFuncT): (WithType<ColumnT, NewAssertFuncT>);
export declare type As<ColumnT extends IColumn, AliasT extends string> = (IExprSelectItem<{
    readonly usedRef: ColumnRefUtil.FromColumn<ColumnT>;
    readonly assertDelegate: ColumnT["assertDelegate"];
    readonly tableAlias: ColumnT["tableAlias"];
    readonly alias: AliasT;
}>);
export declare function as<ColumnT extends IColumn, AliasT extends string>(column: ColumnT, alias: AliasT): As<ColumnT, AliasT>;
export declare type ToInterface<ColumnT extends IColumn> = (ColumnT extends IColumn ? IColumn<{
    readonly tableAlias: ColumnT["tableAlias"];
    readonly name: ColumnT["name"];
    readonly assertDelegate: ColumnT["assertDelegate"];
}> : never);
export declare function setIsInSelectClause<ColumnT extends IColumn>(column: ColumnT, __isInSelectClause: boolean): Column<ColumnT>;
export declare type ExtractNullable<ColumnT extends IColumn> = (ColumnT extends IColumn ? (null extends ReturnType<ColumnT["assertDelegate"]> ? ColumnT : never) : never);
//# sourceMappingURL=operation.d.ts.map