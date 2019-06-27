import * as sd from "type-mapping";
import {Expr} from "../../../expr";
import {RawExpr} from "../../../raw-expr";
import {RawExprUtil} from "../../../raw-expr";
import {FunctionCall} from "../../../query-tree";

/**
 * https://dev.mysql.com/doc/refman/5.7/en/precision-math-decimal-characteristics.html
 *
 * Casts `rawExpr` into `DECIMAL(maxDigitCount, fractionalDigitCount)`
 * where `fractionalDigitCount <= maxDigitCount`
 *
 * @param rawExpr
 * @param maxDigitCount - [1, 65]
 * @param fractionalDigitCount - [0, 30] && <= `maxDigitCount`
 */
export function __internalCastAsDecimal<
    RawExprT extends RawExpr<bigint|number|null>
>(
    rawExpr : RawExprT,
    maxDigitCount : number,
    fractionalDigitCount : number
) : (
    Expr<{
        usedRef : RawExprUtil.UsedRef<RawExprT>,
        assertDelegate : sd.SafeMapper<string|null>,
    }>
) {
    return new Expr(
        {
            usedRef : RawExprUtil.usedRef(rawExpr),
            assertDelegate : sd.orNull(sd.string()),
        },
        new FunctionCall("CAST", [
            [
                RawExprUtil.queryTree(rawExpr),
                "AS",
                "DECIMAL(",
                RawExprUtil.queryTree(maxDigitCount),
                ",",
                RawExprUtil.queryTree(fractionalDigitCount),
                ")"
            ]
        ])
    );
}
