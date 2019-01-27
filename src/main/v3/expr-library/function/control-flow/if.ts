import * as sd from "schema-decorator";
import {Expr} from "../../../expr";
import {RawExpr} from "../../../raw-expr";
import {RawExprUtil} from "../../../raw-expr";
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
        usedColumns : (
            RawExprUtil.UsedColumns<ConditionT>[number] |
            RawExprUtil.UsedColumns<ThenT>[number] |
            RawExprUtil.UsedColumns<ElseT>[number]
        )[],
        assertDelegate : sd.AssertDelegate<
            RawExprUtil.TypeOf<ThenT> |
            RawExprUtil.TypeOf<ElseT>
        >,
    }>
) {
    const result = new Expr(
        {
            usedColumns : RawExprUtil.Array.usedColumns([
                condition,
                thenExpr,
                elseExpr,
            ]),
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