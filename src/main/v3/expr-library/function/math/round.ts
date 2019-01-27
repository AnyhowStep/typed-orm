import * as sd from "schema-decorator";
import {Expr} from "../../../expr";
import {RawExpr} from "../../../raw-expr";
import {RawExprUtil} from "../../../raw-expr";
import {FunctionCall} from "../../../query-tree";
import * as dataType from "../../../data-type";

//https://dev.mysql.com/doc/refman/8.0/en/mathematical-functions.html#function_round
export function round<RawExprT extends RawExpr<number>>(
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
            "ROUND",
            [
                RawExprUtil.queryTree(rawExpr)
            ]
        )
    );
    return result;
}