import * as sd from "type-mapping";
import {Expr} from "../../../expr";
import {RawExpr} from "../../../raw-expr";
import {RawExprUtil} from "../../../raw-expr";
import * as dataType from "../../../data-type";
import {Parentheses} from "../../../query-tree";

/**
 * We don't have `CAST(x AS DOUBLE)` so we use a hack.
 *
 * `(x + 0e0)` will give us a `DOUBLE`
 *
 * -----
 *
 * Should not be called directly, in general.
 *
 * @param rawExpr
 */
export function __internalCastAsDouble<
    RawExprT extends RawExpr<bigint|string>
>(
    rawExpr : RawExprT
) : (
    Expr<{
        usedRef : RawExprUtil.UsedRef<RawExprT>,
        assertDelegate : sd.SafeMapper<number>,
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