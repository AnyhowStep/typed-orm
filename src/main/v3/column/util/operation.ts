import * as sd from "schema-decorator";
import {IColumn, Column} from "../column";

/*
    Used to implement LEFT/RIGHT JOINs.

    When doing a LEFT/RIGHT JOIN,
    certain columns become nullable
    because the row may be missing.
*/
export type ToNullable<ColumnT extends IColumn> = (
    Column<{
        readonly tableAlias : ColumnT["tableAlias"],
        readonly name : ColumnT["name"],
        readonly assertDelegate : sd.AssertDelegate<
            null|
            ReturnType<ColumnT["assertDelegate"]>
        >,
    }>
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
    );
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
    Column<{
        readonly tableAlias : ColumnT["tableAlias"],
        readonly name : ColumnT["name"],
        readonly assertDelegate : sd.ToAssertDelegate<NewAssertDelegateT>,
    }>
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
    );
}
