import * as sd from "schema-decorator";
import {Expr} from "../../../expr";
import {RawExpr} from "../../../raw-expr";
import {RawExprUtil} from "../../../raw-expr";
import {FunctionCall} from "../../../query-tree";
import * as dataType from "../../../data-type";

//https://dev.mysql.com/doc/refman/8.0/en/cast-functions.html#function_cast
export function castAsSignedInteger<
    RawExprT extends RawExpr<number>
>(
    rawExpr : RawExprT
) : (
    Expr<{
        usedRef : RawExprUtil.UsedRef<RawExprT>,
        assertDelegate : sd.AssertDelegate<bigint>,
    }>
) {
    return new Expr(
        {
            usedRef : RawExprUtil.usedRef(rawExpr),
            assertDelegate : dataType.bigint(),
        },
        new FunctionCall("CAST", [
            [
                RawExprUtil.queryTree(rawExpr),
                "AS",
                "SIGNED INTEGER"
            ]
        ])
    );
}