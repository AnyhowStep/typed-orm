import * as sd from "type-mapping";
import * as ColumnUtil from "./util";
import {SortDirection} from "../order";

export interface ColumnData {
    readonly tableAlias : string;
    readonly name : string;
    readonly assertDelegate : sd.SafeMapper<any>;
}
export interface IColumn<DataT extends ColumnData=ColumnData> {
    readonly tableAlias : DataT["tableAlias"];
    readonly name : DataT["name"];
    readonly assertDelegate : DataT["assertDelegate"];

    //HACK for referencing IExprSelectItem
    readonly __isFromExprSelectItem : boolean;
}
export type IAnonymousTypedColumn<T> = IColumn<{
    readonly tableAlias : string,
    readonly name : string,
    readonly assertDelegate : sd.SafeMapper<T>,
}>;

export class Column<DataT extends ColumnData> implements IColumn<DataT> {
    readonly tableAlias : DataT["tableAlias"];
    readonly name : DataT["name"];
    readonly assertDelegate : DataT["assertDelegate"];

    //HACK for referencing IExprSelectItem
    readonly __isFromExprSelectItem : boolean;

    constructor (
        data : DataT,
        __isFromExprSelectItem? : boolean
    ) {
        this.tableAlias = data.tableAlias;
        this.name = data.name;
        this.assertDelegate = data.assertDelegate;

        //HACK
        this.__isFromExprSelectItem = (__isFromExprSelectItem === true);
    }

    queryTree () {
        return ColumnUtil.queryTree(this);
    }
    toNullable () : ColumnUtil.ToNullable<this> {
        return ColumnUtil.toNullable(this);
    }
    withTableAlias<NewTableAliasT extends string> (
        newTableAlias : NewTableAliasT
    ) : (
        ColumnUtil.WithTableAlias<this, NewTableAliasT>
    ) {
        return ColumnUtil.withTableAlias(this, newTableAlias);
    }
    withType<NewAssertFuncT extends sd.AnySafeMapper> (
        newAssertFunc : NewAssertFuncT
    ) : (
        ColumnUtil.WithType<this, NewAssertFuncT>
    ) {
        return ColumnUtil.withType(this, newAssertFunc);
    }

    as<AliasT extends string> (alias : AliasT) : ColumnUtil.As<this, AliasT> {
        return ColumnUtil.as(this, alias);
    }

    asc () : ColumnUtil.Asc<this> {
        return ColumnUtil.asc(this);
    }
    desc () : ColumnUtil.Desc<this> {
        return ColumnUtil.desc(this);
    }
    sort (sortDirection : SortDirection) : ColumnUtil.Sort<this> {
        return ColumnUtil.sort(this, sortDirection);
    }
}

export function column<
    TableAliasT extends string,
    NameT extends string,
    AssertFuncT extends sd.AnySafeMapper
> (
    tableAlias : TableAliasT,
    name : NameT,
    assertFunc : AssertFuncT
) : Column<{
    readonly tableAlias : TableAliasT,
    readonly name : NameT,
    readonly assertDelegate : sd.SafeMapper<sd.OutputOf<AssertFuncT>>,
}> {
    return new Column({
        tableAlias,
        name,
        assertDelegate : assertFunc as sd.SafeMapper<sd.OutputOf<AssertFuncT>>,
    });
}