import * as sd from "schema-decorator";
import {IColumn, Column} from "../../column";

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
        __isFromExprSelectItem,
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
        __isFromExprSelectItem
    ) as IColumn as ToNullable<ColumnT>;
}
