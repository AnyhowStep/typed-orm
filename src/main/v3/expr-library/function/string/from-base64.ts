import * as sd from "schema-decorator";
import {Expr} from "../../../expr";
import {RawExpr} from "../../../raw-expr";
import {RawExprUtil} from "../../../raw-expr";
import {FunctionCall} from "../../../query-tree";

//https://dev.mysql.com/doc/refman/8.0/en/string-functions.html#function_from-base64
export function fromBase64<StrExprT extends RawExpr<string>>(
    strExpr : StrExprT
) : (
    Expr<{
        usedRef : RawExprUtil.UsedRef<StrExprT>,
        assertDelegate : sd.AssertDelegate<string>,
    }>
) {
    const result = new Expr(
        {
            usedRef : RawExprUtil.usedRef(strExpr),
            assertDelegate : sd.string(),
        },
        new FunctionCall(
            "FROM_BASE64",
            [
                RawExprUtil.queryTree(strExpr)
            ]
        )
    );
    return result;
}