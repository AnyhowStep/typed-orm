import * as sd from "type-mapping";
import {IColumn, Column} from "../../column";

/**
 * Used to implement narrowing
 */
export type ToNonNullable<ColumnT extends IColumn> = (
    ColumnT extends IColumn ?
    Column<{
        readonly tableAlias : ColumnT["tableAlias"],
        readonly name : ColumnT["name"],
        readonly assertDelegate : sd.SafeMapper<
            Exclude<
                ReturnType<ColumnT["assertDelegate"]>,
                null
            >
        >,
    }> :
    never
);
export function toNonNullable<ColumnT extends IColumn> (
    {
        tableAlias,
        name,
        assertDelegate,
        __isFromExprSelectItem,
    } : ColumnT
) : (
    ToNonNullable<ColumnT>
) {
    return new Column(
        {
            tableAlias,
            name,
            assertDelegate : sd.notNull(assertDelegate),
        },
        __isFromExprSelectItem
    ) as IColumn as ToNonNullable<ColumnT>;
}
