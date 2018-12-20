import * as sd from "schema-decorator";
import {Expr} from "../../../expr";
import {RawExpr} from "../../../raw-expr";
import {RawExprUtil} from "../../../raw-expr";
import {FunctionCall} from "../../../query-tree";

//https://dev.mysql.com/doc/refman/8.0/en/string-functions.html#function_bin
//TODO Debate if should only allow bigint?
//Returns a string representation of the binary value of N,
//where N is a longlong (BIGINT) number.
//This is equivalent to CONV(N,10,2).
//Returns NULL if N is NULL.
export function bin<RawExprT extends RawExpr<number>>(
    rawExpr : RawExprT
) : (
    Expr<{
        usedRef : RawExprUtil.UsedRef<RawExprT>,
        assertDelegate : sd.AssertDelegate<string>,
    }>
) {
    const result = new Expr(
        {
            usedRef : RawExprUtil.usedRef(rawExpr),
            assertDelegate : sd.match(/^(1|0)+$/, name => `${name} must be a non-empty binary string`),
        },
        new FunctionCall(
            "BIN",
            [
                RawExprUtil.queryTree(rawExpr)
            ]
        )
    );
    return result;
}