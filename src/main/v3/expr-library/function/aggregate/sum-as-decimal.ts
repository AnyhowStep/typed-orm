import * as sd from "type-mapping";
import {Expr} from "../../../expr";
import {RawExpr} from "../../../raw-expr";
import {RawExprUtil} from "../../../raw-expr";
import {FunctionCall, Parentheses} from "../../../query-tree";
import * as dataType from "../../../data-type";
import { __internalCastAsDecimal } from "../cast";

/**
 * https://dev.mysql.com/doc/refman/8.0/en/group-by-functions.html#function_sum
 *
 * ```ts
 * const QST = 0.0975;
 * const GST = 0.05;
 * console.log(QST + GST);
 * ```
 *
 * Were you expecting `0.1475`?
 *
 * The result is `0.14750000000000002`.
 *
 * Another example of double behaving in unintuitive ways.
 *
 * -----
 *
 * Using `SUM()` on `double`/`float` values can give you the above result, too.
 * The solution is to convert the values to a `DECIMAL(M, D)` type, sum that,
 * then convert the result back to a `double`.
 *
 * -----
 *
 * https://dev.mysql.com/doc/refman/5.7/en/precision-math-decimal-characteristics.html
 *
 * + Casts `rawExpr` into `DECIMAL(maxDigitCount, fractionalDigitCount)`
 * + Where `fractionalDigitCount <= maxDigitCount`
 * + Where `maxDigitCount` is [1, 65]
 * + Where `fractionalDigitCount` is [0, 30] && <= `maxDigitCount`
 */
export function sumAsDecimal<RawExprT extends RawExpr<number|null>>(
    rawExpr : RawExprT,
    decimal : {
        maxDigitCount : number,
        fractionalDigitCount : number,
    }
) : (
    Expr<{
        usedRef : RawExprUtil.UsedRef<RawExprT>,
        //If there are no matching rows, SUM() returns NULL.
        assertDelegate : sd.SafeMapper<number|null>,
    }>
) {
    const result = new Expr(
        {
            usedRef : RawExprUtil.usedRef(rawExpr),
            assertDelegate : sd.orNull(dataType.double()),
        },
        /**
         * Adapted from `castAsDouble()`
         */
        Parentheses.Create([
            new FunctionCall(
                "SUM",
                [
                    RawExprUtil.queryTree(
                        __internalCastAsDecimal(rawExpr, decimal.maxDigitCount, decimal.fractionalDigitCount)
                    )
                ]
            ),
            "+",
            "0e0"
        ])
    );
    return result;
}