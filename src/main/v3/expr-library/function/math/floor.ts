import * as sd from "schema-decorator";
import {Expr} from "../../../expr";
import {RawExpr} from "../../../raw-expr";
import {RawExprUtil} from "../../../raw-expr";
import {FunctionCall} from "../../../query-tree";

//https://dev.mysql.com/doc/refman/8.0/en/mathematical-functions.html#function_floor
export function floor<RawExprT extends RawExpr<number>>(
    rawExpr : RawExprT
) : (
    Expr<{
        usedRef : RawExprUtil.UsedRef<RawExprT>,
        assertDelegate : sd.AssertDelegate<number>,
    }>
) {
    const result = new Expr(
        {
            usedRef : RawExprUtil.usedRef(rawExpr),
            assertDelegate : sd.naturalNumber(),
        },
        new FunctionCall(
            "FLOOR",
            [
                RawExprUtil.queryTree(rawExpr)
            ]
        )
    );
    return result;
}