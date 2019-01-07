import * as sd from "schema-decorator";
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
            assertDelegate : sd.toAssertDelegate(newAssertFunc),
        },
        __isFromExprSelectItem
    ) as WithType<ColumnT, NewAssertFuncT>;
}