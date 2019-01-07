import * as sd from "schema-decorator";
import * as ColumnUtil from "./util";
import {SortDirection} from "../order";

export interface ColumnData {
    readonly tableAlias : string;
    readonly name : string;
    readonly assertDelegate : sd.AssertDelegate<any>;
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
    readonly assertDelegate : sd.AssertDelegate<T>,
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
    withType<NewAssertFuncT extends sd.AnyAssertFunc> (
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
    AssertFuncT extends sd.AnyAssertFunc
> (
    tableAlias : TableAliasT,
    name : NameT,
    assertFunc : AssertFuncT
) : Column<{
    readonly tableAlias : TableAliasT,
    readonly name : NameT,
    readonly assertDelegate : sd.ToAssertDelegate<AssertFuncT>,
}> {
    return new Column({
        tableAlias,
        name,
        assertDelegate : sd.toAssertDelegate(assertFunc),
    });
}