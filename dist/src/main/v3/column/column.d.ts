import * as sd from "schema-decorator";
import { SingleValueSelectItem } from "../select-item";
import { IExprSelectItem } from "../expr-select-item";
export interface ColumnData {
    readonly tableAlias: string;
    readonly name: string;
    readonly assertDelegate: sd.AssertDelegate<any>;
}
export interface IColumn<DataT extends ColumnData = ColumnData> {
    readonly tableAlias: DataT["tableAlias"];
    readonly name: DataT["name"];
    readonly assertDelegate: DataT["assertDelegate"];
    readonly __subTableName: string | undefined;
    readonly __isInSelectClause: boolean;
}
export declare type IAnonymousTypedColumn<T> = IColumn<{
    readonly tableAlias: string;
    readonly name: string;
    readonly assertDelegate: sd.AssertDelegate<T>;
}>;
export declare class Column<DataT extends ColumnData> implements IColumn<DataT> {
    readonly tableAlias: DataT["tableAlias"];
    readonly name: DataT["name"];
    readonly assertDelegate: DataT["assertDelegate"];
    readonly __subTableName: string | undefined;
    readonly __isInSelectClause: boolean;
    constructor(data: DataT, __subTableName?: string, __isInSelectClause?: boolean);
    queryStringTree(): string;
    toNullable(): Column.ToNullable<this>;
    withTableAlias<NewTableAliasT extends string>(newTableAlias: NewTableAliasT): (Column.WithTableAlias<this, NewTableAliasT>);
    withType<NewAssertFuncT extends sd.AnyAssertFunc>(newAssertFunc: NewAssertFuncT): (Column.WithType<this, NewAssertFuncT>);
    assertIsEqual(other: IColumn): void;
    toColumnIdentifier(): Column.ToColumnIdentifier<this>;
}
export declare namespace Column {
    function queryStringTree({ tableAlias, name, __subTableName, __isInSelectClause, }: IColumn): string;
    type ToNullable<ColumnT extends IColumn> = (Column<{
        readonly tableAlias: ColumnT["tableAlias"];
        readonly name: ColumnT["name"];
        readonly assertDelegate: sd.AssertDelegate<null | ReturnType<ColumnT["assertDelegate"]>>;
    }>);
    function toNullable<ColumnT extends IColumn>({ tableAlias, name, assertDelegate, __subTableName, __isInSelectClause, }: ColumnT): (ToNullable<ColumnT>);
    type WithTableAlias<ColumnT extends IColumn, NewTableAliasT extends string> = (Column<{
        readonly tableAlias: NewTableAliasT;
        readonly name: ColumnT["name"];
        readonly assertDelegate: ColumnT["assertDelegate"];
    }>);
    function withTableAlias<ColumnT extends IColumn, NewTableAliasT extends string>({ name, assertDelegate, __subTableName, __isInSelectClause, }: ColumnT, newTableAlias: NewTableAliasT): (WithTableAlias<ColumnT, NewTableAliasT>);
    type WithType<ColumnT extends IColumn, NewAssertDelegateT extends sd.AnyAssertFunc> = (Column<{
        readonly tableAlias: ColumnT["tableAlias"];
        readonly name: ColumnT["name"];
        readonly assertDelegate: sd.ToAssertDelegate<NewAssertDelegateT>;
    }>);
    function withType<ColumnT extends IColumn, NewAssertFuncT extends sd.AnyAssertFunc>({ tableAlias, name, __subTableName, __isInSelectClause, }: ColumnT, newAssertFunc: NewAssertFuncT): (WithType<ColumnT, NewAssertFuncT>);
    function isColumn(raw: any): raw is IColumn;
    type FromExprSelectItem<ItemT extends IExprSelectItem> = (Column<{
        readonly tableAlias: ItemT["tableAlias"];
        readonly name: ItemT["alias"];
        readonly assertDelegate: ItemT["assertDelegate"];
    }>);
    function fromExprSelectItem<ItemT extends IExprSelectItem>(item: ItemT): FromExprSelectItem<ItemT>;
    type FromSingleValueSelectItem<ItemT extends SingleValueSelectItem> = (ItemT extends IColumn ? Column<{
        readonly tableAlias: ItemT["tableAlias"];
        readonly name: ItemT["name"];
        readonly assertDelegate: ItemT["assertDelegate"];
    }> : ItemT extends IExprSelectItem ? FromExprSelectItem<ItemT> : never);
    function fromSingleValueSelectItem<ItemT extends SingleValueSelectItem>(item: ItemT): FromSingleValueSelectItem<ItemT>;
    function assertIsEqual(a: IColumn, b: IColumn): void;
    type ToColumnIdentifier<ColumnT extends IColumn> = ({
        readonly tableAlias: ColumnT["tableAlias"];
        readonly name: ColumnT["name"];
    });
    function toColumnIdentifier<ColumnT extends IColumn>(column: ColumnT): ToColumnIdentifier<ColumnT>;
}
export declare function column<TableAliasT extends string, NameT extends string, AssertFuncT extends sd.AnyAssertFunc>(tableAlias: TableAliasT, name: NameT, assertFunc: AssertFuncT): Column<{
    readonly tableAlias: TableAliasT;
    readonly name: NameT;
    readonly assertDelegate: sd.ToAssertDelegate<AssertFuncT>;
}>;
//# sourceMappingURL=column.d.ts.map