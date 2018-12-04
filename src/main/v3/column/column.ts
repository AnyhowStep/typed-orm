import * as sd from "schema-decorator";
import * as ColumnUtil from "./util";

export interface ColumnData {
    readonly tableAlias : string;
    readonly name : string;
    readonly assertDelegate : sd.AssertDelegate<any>;
}
export interface IColumn<DataT extends ColumnData=ColumnData> {
    readonly tableAlias : DataT["tableAlias"];
    readonly name : DataT["name"];
    readonly assertDelegate : DataT["assertDelegate"];

    //HACK for JOINING with nested queries
    readonly __subTableName : string|undefined;
    //HACK for referencing selected columns
    readonly __isInSelectClause : boolean;
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

    //HACK for JOINING with nested queries
    readonly __subTableName : string|undefined;
    //HACK for referencing selected columns
    readonly __isInSelectClause : boolean;

    constructor (
        data : DataT,
        __subTableName? : string,
        __isInSelectClause? : boolean
    ) {
        this.tableAlias = data.tableAlias;
        this.name = data.name;
        this.assertDelegate = data.assertDelegate;

        //HACK
        this.__subTableName = __subTableName;
        //HACK
        this.__isInSelectClause = (__isInSelectClause === true);
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

    /*as<AliasT extends string>(alias : AliasT) : AliasedExpr<
        {
            [tableAlias in TableAliasT] : {
                [columnName in NameT] : Column<
                    TableAliasT,
                    NameT,
                    TypeT
                >
            }
        },
        "__expr",
        AliasT,
        TypeT
    > {
        return new AliasedExpr(
            {
                [this.tableAlias] : {
                    [this.name] : this
                }
            },
            "__expr",
            alias,
            this.assertDelegate,
            this.fullName
        ) as any;
    }*/
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