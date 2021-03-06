import * as sd from "type-mapping";
import {Expr} from "../../../expr";
import {RawExpr} from "../../../raw-expr";
import {RawExprUtil} from "../../../raw-expr";
import {FunctionCall} from "../../../query-tree";

//https://dev.mysql.com/doc/refman/8.0/en/string-functions.html#function_hex
//TODO-DEBATE Debate if number should not be allowed?
//For a numeric argument N,
//HEX() returns a hexadecimal string representation
//of the value of N treated as a longlong (BIGINT) number.
//NOTE: HEX('') gives you an empty string!
export function hex<RawExprT extends RawExpr<bigint|number|string>>(
    rawExpr : RawExprT
) : (
    Expr<{
        usedRef : RawExprUtil.UsedRef<RawExprT>,
        assertDelegate : sd.SafeMapper<string>,
    }>
) {
    const result = new Expr(
        {
            usedRef : RawExprUtil.usedRef(rawExpr),
            assertDelegate : sd.match(/^[0-9A-F]*$/, name => `${name} must be a hexadecimal string, with uppercase A-F`),
        },
        new FunctionCall(
            "HEX",
            [
                RawExprUtil.queryTree(rawExpr)
            ]
        )
    );
    return result;
}