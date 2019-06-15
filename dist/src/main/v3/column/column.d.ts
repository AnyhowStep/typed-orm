import * as sd from "type-mapping";
import * as ColumnUtil from "./util";
import { SortDirection } from "../order";
export interface ColumnData {
    readonly tableAlias: string;
    readonly name: string;
    readonly assertDelegate: sd.SafeMapper<any>;
}
export interface IColumn<DataT extends ColumnData = ColumnData> {
    readonly tableAlias: DataT["tableAlias"];
    readonly name: DataT["name"];
    readonly assertDelegate: DataT["assertDelegate"];
    readonly __isFromExprSelectItem: boolean;
}
export declare type IAnonymousTypedColumn<T> = IColumn<{
    readonly tableAlias: string;
    readonly name: string;
    readonly assertDelegate: sd.SafeMapper<T>;
}>;
export declare class Column<DataT extends ColumnData> implements IColumn<DataT> {
    readonly tableAlias: DataT["tableAlias"];
    readonly name: DataT["name"];
    readonly assertDelegate: DataT["assertDelegate"];
    readonly __isFromExprSelectItem: boolean;
    constructor(data: DataT, __isFromExprSelectItem?: boolean);
    queryTree(): string;
    toNullable(): ColumnUtil.ToNullable<this>;
    withTableAlias<NewTableAliasT extends string>(newTableAlias: NewTableAliasT): (ColumnUtil.WithTableAlias<this, NewTableAliasT>);
    withType<NewAssertFuncT extends sd.AnySafeMapper>(newAssertFunc: NewAssertFuncT): (ColumnUtil.WithType<this, NewAssertFuncT>);
    as<AliasT extends string>(alias: AliasT): ColumnUtil.As<this, AliasT>;
    asc(): ColumnUtil.Asc<this>;
    desc(): ColumnUtil.Desc<this>;
    sort(sortDirection: SortDirection): ColumnUtil.Sort<this>;
}
export declare function column<TableAliasT extends string, NameT extends string, AssertFuncT extends sd.AnySafeMapper>(tableAlias: TableAliasT, name: NameT, assertFunc: AssertFuncT): Column<{
    readonly tableAlias: TableAliasT;
    readonly name: NameT;
    readonly assertDelegate: sd.SafeMapper<sd.OutputOf<AssertFuncT>>;
}>;
