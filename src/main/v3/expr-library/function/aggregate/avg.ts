import * as sd from "schema-decorator";
import {Expr} from "../../../expr";
import {RawExpr} from "../../../raw-expr";
import {RawExprUtil} from "../../../raw-expr";
import {FunctionCall} from "../../../query-tree";

//https://dev.mysql.com/doc/refman/8.0/en/group-by-functions.html#function_avg
export function avg<RawExprT extends RawExpr<number|bigint|null>>(
    rawExpr : RawExprT
) : (
    Expr<{
        usedRef : RawExprUtil.UsedRef<RawExprT>,
        //If there are no matching rows, AVG() returns NULL.
        assertDelegate : sd.AssertDelegate<number|null>,
    }>
) {
    const result = new Expr(
        {
            usedRef : RawExprUtil.usedRef(rawExpr),
            assertDelegate : sd.nullable(sd.number()),
        },
        new FunctionCall(
            "AVG",
            [
                RawExprUtil.queryTree(rawExpr)
            ]
        )
    );
    return result;
}