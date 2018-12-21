import * as sd from "schema-decorator";
import {RawExpr, RawExprUtil} from "../../../raw-expr";
import {Expr} from "../../../expr";

//https://dev.mysql.com/doc/refman/8.0/en/arithmetic-functions.html#operator_unary-minus
export function neg<
    RawExprT extends RawExpr<number>
> (
    rawExpr : RawExprT
) : (
    Expr<{
        usedRef : RawExprUtil.UsedRef<RawExprT>,
        assertDelegate : sd.AssertDelegate<number>,
    }>
) {
    return new Expr(
        {
            usedRef : RawExprUtil.usedRef(rawExpr),
            assertDelegate : sd.number(),
        },
        [
            "-",
            RawExprUtil.queryTree(rawExpr),
        ]
    );
}