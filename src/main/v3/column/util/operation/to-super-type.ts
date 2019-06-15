import * as sd from "type-mapping";
import {IColumn, Column} from "../../column";
import {PrimitiveExprUtil} from "../../../primitive-expr";

/*
    Makes 1n become bigint.
    Makes true become boolean.
    Makes "test" become string.
    Handles nullable columns.

    We currently only use this for compile-time
    operation compatibility checks.
    (See innerJoinPk in JoinDeclaration)
*/
export type ToSuperType<ColumnT extends IColumn> = (
    ColumnT extends IColumn ?
    Column<{
        readonly tableAlias : ColumnT["tableAlias"],
        readonly name : ColumnT["name"],
        readonly assertDelegate : sd.SafeMapper<
            PrimitiveExprUtil.ToSuperType<
                ReturnType<ColumnT["assertDelegate"]>
            >
        >,
    }> :
    never
);