import * as sd from "type-mapping";
import {Expr} from "../../../expr";
import {RawExpr} from "../../../raw-expr";
import {RawExprUtil} from "../../../raw-expr";
import {ColumnRefUtil} from "../../../column-ref";
import {FunctionCall} from "../../../query-tree";
import {PrimitiveExpr} from "../../../primitive-expr";

//https://dev.mysql.com/doc/refman/8.0/en/control-flow-functions.html#function_if
function If<
    ConditionT extends RawExpr<boolean>,
    ThenT extends RawExpr<PrimitiveExpr>,
    ElseT extends RawExpr<PrimitiveExpr>
>(
    condition : ConditionT,
    thenExpr : ThenT,
    elseExpr : ElseT
) : (
    Expr<{
        usedRef : (
            RawExprUtil.UsedRef<ConditionT> &
            RawExprUtil.UsedRef<ThenT> &
            RawExprUtil.UsedRef<ElseT>
        ),
        assertDelegate : sd.SafeMapper<
            RawExprUtil.TypeOf<ThenT> |
            RawExprUtil.TypeOf<ElseT>
        >,
    }>
) {
    const result = new Expr(
        {
            usedRef : ColumnRefUtil.intersect(
                RawExprUtil.usedRef(condition),
                ColumnRefUtil.intersect(
                    RawExprUtil.usedRef(thenExpr),
                    RawExprUtil.usedRef(elseExpr)
                )
            ),
            assertDelegate : sd.or(
                RawExprUtil.assertDelegate(thenExpr),
                RawExprUtil.assertDelegate(elseExpr)
            ),
        },
        new FunctionCall(
            "IF",
            [
                RawExprUtil.queryTree(condition),
                RawExprUtil.queryTree(thenExpr),
                RawExprUtil.queryTree(elseExpr),
            ]
        )
    );
    return result as any;
}
export {If as if};