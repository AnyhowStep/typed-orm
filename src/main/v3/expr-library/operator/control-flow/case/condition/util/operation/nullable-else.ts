import * as sd from "type-mapping";
import {RawExpr} from "../../../../../../../raw-expr";
import {RawExprUtil} from "../../../../../../../raw-expr";
import {ColumnRefUtil} from "../../../../../../../column-ref";
import {Expr} from "../../../../../../../expr";
import {AfterWhenCase} from "./after-when-case";

export type NullableElse<
    BuilderT extends AfterWhenCase,
    ElseT extends RawExpr<
        ReturnType<BuilderT["result"]>|null
    >
> = (
    Expr<{
        usedRef : (
            BuilderT["usedRef"] &
            RawExprUtil.UsedRef<ElseT>
        ),
        assertDelegate : sd.SafeMapper<
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
            usedRef : ColumnRefUtil.intersect(
                builder.usedRef,
                RawExprUtil.usedRef(elseExpr),
            ),
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