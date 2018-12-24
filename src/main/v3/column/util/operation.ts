import * as sd from "schema-decorator";
import {IColumn, Column} from "../column";
import {IExprSelectItem} from "../../expr-select-item";
import {ColumnRefUtil} from "../../column-ref";
import {queryTree} from "./query";
import {ASC, DESC, SortDirection} from "../../order";

/*
    Used to implement LEFT/RIGHT JOINs.

    When doing a LEFT/RIGHT JOIN,
    certain columns become nullable
    because the row may be missing.
*/
export type ToNullable<ColumnT extends IColumn> = (
    ColumnT extends IColumn ?
    Column<{
        readonly tableAlias : ColumnT["tableAlias"],
        readonly name : ColumnT["name"],
        readonly assertDelegate : sd.AssertDelegate<
            null|
            ReturnType<ColumnT["assertDelegate"]>
        >,
    }> :
    never
);
export function toNullable<ColumnT extends IColumn> (
    {
        tableAlias,
        name,
        assertDelegate,
        __subTableName,
        __isInSelectClause,
    } : ColumnT
) : (
    ToNullable<ColumnT>
) {
    return new Column(
        {
            tableAlias,
            name,
            assertDelegate : sd.nullable(assertDelegate),
        },
        __subTableName,
        __isInSelectClause
    ) as IColumn as ToNullable<ColumnT>;
}

/*
    Used to implement the AS clause as in,

    SELECT
        table AS aliased
    ...
*/
export type WithTableAlias<
    ColumnT extends IColumn,
    NewTableAliasT extends string
> = (
    ColumnT extends IColumn ?
    Column<{
        readonly tableAlias : NewTableAliasT,
        readonly name : ColumnT["name"],
        readonly assertDelegate : ColumnT["assertDelegate"],
    }> :
    never
);
export function withTableAlias<
    ColumnT extends IColumn,
    NewTableAliasT extends string
> (
    {
        name,
        assertDelegate,
        __subTableName,
        __isInSelectClause,
    } : ColumnT,
    newTableAlias : NewTableAliasT
) : (
    WithTableAlias<ColumnT, NewTableAliasT>
) {
    const result = new Column(
        {
            tableAlias : newTableAlias,
            name,
            assertDelegate,
        },
        __subTableName,
        __isInSelectClause
    );
    return result as WithTableAlias<ColumnT, NewTableAliasT>;
}

/*
    Used to narrow/widen the type of a column.

    For example,

    WHERE
        column IS NULL

    will narrow the column's type to `null`
*/
export type WithType<
    ColumnT extends IColumn,
    NewAssertDelegateT extends sd.AnyAssertFunc
> = (
    ColumnT extends IColumn ?
    Column<{
        readonly tableAlias : ColumnT["tableAlias"],
        readonly name : ColumnT["name"],
        readonly assertDelegate : sd.ToAssertDelegate<NewAssertDelegateT>,
    }> :
    never
);
export function withType<
    ColumnT extends IColumn,
    NewAssertFuncT extends sd.AnyAssertFunc
> (
    {
        tableAlias,
        name,
        __subTableName,
        __isInSelectClause,
    } : ColumnT,
    newAssertFunc : NewAssertFuncT,
) : (
    WithType<ColumnT, NewAssertFuncT>
) {
    return new Column(
        {
            tableAlias,
            name,
            assertDelegate : sd.toAssertDelegate(newAssertFunc),
        },
        __subTableName,
        __isInSelectClause
    ) as WithType<ColumnT, NewAssertFuncT>;
}

export type As<ColumnT extends IColumn, AliasT extends string> = (
    IExprSelectItem<{
        readonly usedRef : ColumnRefUtil.FromColumn<ColumnT>;
        readonly assertDelegate : ColumnT["assertDelegate"];

        /*
            Consider the following.

            const table = o.table(
                "table",
                {
                    x : sd.boolean(),
                    y : sd.string(),
                    z : sd.boolean(),
                }
            );

            o.from(table)
                .select(c => [c.z.as("x")])
                .having(c => c.x)

            c.x in the HAVING clause is now ambiguous!

            Is it c.z AS x? Or regular c.x?

            Because of this, you cannot alias to something that hides
            a column in the FROM/JOIN clauses.
        */
        readonly tableAlias : ColumnT["tableAlias"];
        readonly alias : AliasT;
    }>
);
export function as<ColumnT extends IColumn, AliasT extends string> (
    column : ColumnT,
    alias : AliasT
) : As<ColumnT, AliasT> {
    return {
        usedRef : ColumnRefUtil.fromColumn(column),
        assertDelegate : column.assertDelegate,
        tableAlias : column.tableAlias,
        alias : alias,
        unaliasedQuery : queryTree(column),
    };
}
//https://github.com/Microsoft/TypeScript/issues/28876
export type ToInterface<ColumnT extends IColumn> = (
    ColumnT extends IColumn ?
    IColumn<{
        readonly tableAlias : ColumnT["tableAlias"],
        readonly name : ColumnT["name"],
        readonly assertDelegate : ColumnT["assertDelegate"],
    }> :
    never
);

export function setIsInSelectClause<ColumnT extends IColumn> (
    column : ColumnT,
    __isInSelectClause : boolean,
) : Column<ColumnT> {
    return new Column(
        column,
        column.__subTableName,
        __isInSelectClause
    );
}

export type ExtractNullable<ColumnT extends IColumn> = (
    ColumnT extends IColumn ?
    (
        null extends ReturnType<ColumnT["assertDelegate"]> ?
        ColumnT :
        never
    ) :
    never
);
export type ExcludeNullable<ColumnT extends IColumn> = (
    ColumnT extends IColumn ?
    (
        null extends ReturnType<ColumnT["assertDelegate"]> ?
        never :
        ColumnT
    ) :
    never
);

export type Asc<ColumnT extends IColumn> = (
    [ColumnT, typeof ASC]
);
export function asc<
    ColumnT extends IColumn
> (column : ColumnT) : Asc<ColumnT> {
    return [column, ASC];
}

export type Desc<ColumnT extends IColumn> = (
    [ColumnT, typeof DESC]
);
export function desc<
    ColumnT extends IColumn
> (column : ColumnT) : Desc<ColumnT> {
    return [column, DESC];
}

export type Sort<ColumnT extends IColumn> = (
    [ColumnT, SortDirection]
);
export function sort<
    ColumnT extends IColumn
> (column : ColumnT, sortDirection : SortDirection) : Sort<ColumnT> {
    return [column, sortDirection];
}