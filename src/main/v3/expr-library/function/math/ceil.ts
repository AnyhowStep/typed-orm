import * as sd from "schema-decorator";
import {Expr} from "../../../expr";
import {RawExpr} from "../../../raw-expr";
import {RawExprUtil} from "../../../raw-expr";
import {FunctionCall} from "../../../query-tree";
import * as dataType from "../../../data-type";

//https://dev.mysql.com/doc/refman/8.0/en/mathematical-functions.html#function_ceil
export function ceil<RawExprT extends RawExpr<number>>(
    rawExpr : RawExprT
) : (
    Expr<{
        usedRef : RawExprUtil.UsedRef<RawExprT>,
        assertDelegate : sd.AssertDelegate<bigint>,
    }>
) {
    const result = new Expr(
        {
            usedRef : RawExprUtil.usedRef(rawExpr),
            assertDelegate : dataType.bigint(),
        },
        new FunctionCall(
            "CEIL",
            [
                RawExprUtil.queryTree(rawExpr)
            ]
        )
    );
    return result;
}