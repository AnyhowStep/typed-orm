import * as sd from "schema-decorator";
import {RawExpr} from "../../../../../../../raw-expr";
import {RawExprUtil} from "../../../../../../../raw-expr";
import {Expr} from "../../../../../../../expr";
import {AfterWhenCase} from "./after-when-case";

export type NullableElse<
    BuilderT extends AfterWhenCase,
    ElseT extends RawExpr<
        ReturnType<BuilderT["result"]>|null
    >
> = (
    Expr<{
        usedColumns : (
            BuilderT["usedColumns"][number] |
            RawExprUtil.UsedColumns<ElseT>[number]
        )[],
        assertDelegate : sd.AssertDelegate<
            ReturnType<BuilderT["result"]> |
            RawExprUtil.TypeOf<ElseT>
        >,
    }>
);
function NullableElseFunction<
    BuilderT extends AfterWhenCase,
    ElseT extends RawExpr<
        ReturnType<BuilderT["result"]>|null
    >
> (
    builder : BuilderT,
    elseExpr : ElseT
) : (
    NullableElse<BuilderT, ElseT>
) {
    return new Expr(
        {
            usedColumns : RawExprUtil.Array.usedColumns([
                ...builder.usedColumns,
                elseExpr,
            ]),
            assertDelegate : sd.or(
                builder.result,
                RawExprUtil.assertDelegate(elseExpr)
            ),
        },
        [
            ...builder.queryTree,
            "ELSE",
            RawExprUtil.queryTree(elseExpr),
            "END",
        ]
    ) as any;
}
export {NullableElseFunction as nullableElse};