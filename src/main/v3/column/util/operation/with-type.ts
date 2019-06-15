import * as sd from "type-mapping";
import {IColumn, Column} from "../../column";

/*
    Used to narrow/widen the type of a column.

    For example,

    WHERE
        column IS NULL

    will narrow the column's type to `null`
*/
export type WithType<
    ColumnT extends IColumn,
    NewAssertFuncT extends sd.AnySafeMapper
> = (
    ColumnT extends IColumn ?
    Column<{
        readonly tableAlias : ColumnT["tableAlias"],
        readonly name : ColumnT["name"],
        readonly assertDelegate : sd.SafeMapper<sd.OutputOf<NewAssertFuncT>>,
    }> :
    never
);
export function withType<
    ColumnT extends IColumn,
    NewAssertFuncT extends sd.AnySafeMapper
> (
    {
        tableAlias,
        name,
        __isFromExprSelectItem,
    } : ColumnT,
    newAssertFunc : NewAssertFuncT,
) : (
    WithType<ColumnT, NewAssertFuncT>
) {
    return new Column(
        {
            tableAlias,
            name,
            assertDelegate : newAssertFunc as sd.SafeMapper<sd.OutputOf<NewAssertFuncT>>,
        },
        __isFromExprSelectItem
    ) as WithType<ColumnT, NewAssertFuncT>;
}