import * as sd from "schema-decorator";
import * as ColumnUtil from "./util";
import { SortDirection } from "../order";
export interface ColumnData {
    readonly tableAlias: string;
    readonly name: string;
    readonly assertDelegate: sd.AssertDelegate<any>;
}
export interface IColumn<DataT extends ColumnData = ColumnData> {
    readonly tableAlias: DataT["tableAlias"];
    readonly name: DataT["name"];
    readonly assertDelegate: DataT["assertDelegate"];
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
    readonly __isInSelectClause: boolean;
    constructor(data: DataT, __isInSelectClause?: boolean);
    queryTree(): string;
    toNullable(): ColumnUtil.ToNullable<this>;
    withTableAlias<NewTableAliasT extends string>(newTableAlias: NewTableAliasT): (ColumnUtil.WithTableAlias<this, NewTableAliasT>);
    withType<NewAssertFuncT extends sd.AnyAssertFunc>(newAssertFunc: NewAssertFuncT): (ColumnUtil.WithType<this, NewAssertFuncT>);
    as<AliasT extends string>(alias: AliasT): ColumnUtil.As<this, AliasT>;
    asc(): ColumnUtil.Asc<this>;
    desc(): ColumnUtil.Desc<this>;
    sort(sortDirection: SortDirection): ColumnUtil.Sort<this>;
}
export declare function column<TableAliasT extends string, NameT extends string, AssertFuncT extends sd.AnyAssertFunc>(tableAlias: TableAliasT, name: NameT, assertFunc: AssertFuncT): Column<{
    readonly tableAlias: TableAliasT;
    readonly name: NameT;
    readonly assertDelegate: sd.ToAssertDelegate<AssertFuncT>;
}>;
//# sourceMappingURL=column.d.ts.map