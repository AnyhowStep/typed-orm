import * as sd from "schema-decorator";
import {RawExpr, RawExprUtil} from "../../../raw-expr";
import {Expr} from "../../../expr";
import * as dataType from "../../../data-type";

//https://dev.mysql.com/doc/refman/8.0/en/arithmetic-functions.html#operator_unary-minus
export function neg<
    RawExprT extends RawExpr<number>
> (
    rawExpr : RawExprT
) : (
    Expr<{
        usedColumns : RawExprUtil.UsedColumns<RawExprT>,
        assertDelegate : sd.AssertDelegate<number>,
    }>
) {
    return new Expr(
        {
            usedColumns : RawExprUtil.usedColumns(rawExpr),
            assertDelegate : dataType.double(),
        },
        [
            "-",
            RawExprUtil.queryTree(rawExpr),
        ]
    );
}