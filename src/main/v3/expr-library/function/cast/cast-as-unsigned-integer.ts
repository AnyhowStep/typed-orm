import * as sd from "schema-decorator";
import {Expr} from "../../../expr";
import {RawExpr} from "../../../raw-expr";
import {RawExprUtil} from "../../../raw-expr";
import {FunctionCall} from "../../../query-tree";
import * as dataType from "../../../data-type";

//https://dev.mysql.com/doc/refman/8.0/en/cast-functions.html#function_cast
export function castAsUnsignedInteger<
    RawExprT extends RawExpr<number>
>(
    rawExpr : RawExprT
) : (
    Expr<{
        usedColumns : RawExprUtil.UsedColumns<RawExprT>,
        assertDelegate : sd.AssertDelegate<bigint>,
    }>
) {
    return new Expr(
        {
            usedColumns : RawExprUtil.usedColumns(rawExpr),
            assertDelegate : dataType.bigint(),
        },
        new FunctionCall("CAST", [
            [
                RawExprUtil.queryTree(rawExpr),
                "AS",
                "UNSIGNED INTEGER"
            ]
        ])
    );
}