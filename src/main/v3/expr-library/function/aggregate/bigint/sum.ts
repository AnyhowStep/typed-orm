import * as sd from "type-mapping";
import {Expr} from "../../../../expr";
import {RawExpr} from "../../../../raw-expr";
import {RawExprUtil} from "../../../../raw-expr";
import {FunctionCall} from "../../../../query-tree";
import * as dataType from "../../../../data-type";

//https://dev.mysql.com/doc/refman/8.0/en/group-by-functions.html#function_sum
export function bigIntSum<RawExprT extends RawExpr<bigint|null>>(
    rawExpr : RawExprT
) : (
    Expr<{
        usedRef : RawExprUtil.UsedRef<RawExprT>,
        //If there are no matching rows, SUM() returns NULL.
        assertDelegate : sd.SafeMapper<bigint|null>,
    }>
) {
    const result = new Expr(
        {
            usedRef : RawExprUtil.usedRef(rawExpr),
            assertDelegate : sd.orNull(dataType.bigint()),
        },
        new FunctionCall(
            "SUM",
            [
                RawExprUtil.queryTree(rawExpr)
            ]
        )
    );
    return result;
}