import * as sd from "schema-decorator";
import {Expr} from "../../../expr";
import {RawExpr} from "../../../raw-expr";
import {RawExprUtil} from "../../../raw-expr";
import {FunctionCall} from "../../../query-tree";
import * as dataType from "../../../data-type";

//https://dev.mysql.com/doc/refman/8.0/en/string-functions.html#function_bit-length
export function bitLength<RawExprT extends RawExpr<string>>(
    rawExpr : RawExprT
) : (
    Expr<{
        usedColumns : RawExprUtil.UsedColumns<RawExprT>,
        assertDelegate : sd.AssertDelegate<bigint>,
    }>
) {
    const result = new Expr(
        {
            usedColumns : RawExprUtil.usedColumns(rawExpr),
            assertDelegate : dataType.bigint(),
        },
        new FunctionCall(
            "BIT_LENGTH",
            [
                RawExprUtil.queryTree(rawExpr)
            ]
        )
    );
    return result;
}