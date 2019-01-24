import * as sd from "schema-decorator";
import {Expr} from "../../../expr";
import {RawExpr} from "../../../raw-expr";
import {RawExprUtil} from "../../../raw-expr";
import * as dataType from "../../../data-type";
import {Parentheses} from "../../../query-tree";

//We don't have CAST(x AS DOUBLE) so we use a hack.
//(x + 0e0) will give us a DOUBLE
export function castAsDouble<
    RawExprT extends RawExpr<bigint>
>(
    rawExpr : RawExprT
) : (
    Expr<{
        usedRef : RawExprUtil.UsedRef<RawExprT>,
        assertDelegate : sd.AssertDelegate<number>,
    }>
) {
    return new Expr(
        {
            usedRef : RawExprUtil.usedRef(rawExpr),
            assertDelegate : dataType.double(),
        },
        Parentheses.Create([
            RawExprUtil.queryTree(rawExpr),
            "+",
            "0e0"
        ])
    );
}