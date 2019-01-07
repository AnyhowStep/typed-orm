import {IColumn, Column} from "../../column";

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
        __isInSelectClause
    );
    return result as WithTableAlias<ColumnT, NewTableAliasT>;
}
