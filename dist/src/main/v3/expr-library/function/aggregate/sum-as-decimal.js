"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("type-mapping");
const expr_1 = require("../../../expr");
const raw_expr_1 = require("../../../raw-expr");
const query_tree_1 = require("../../../query-tree");
const dataType = require("../../../data-type");
const cast_1 = require("../cast");
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
function sumAsDecimal(rawExpr, decimal) {
    const result = new expr_1.Expr({
        usedRef: raw_expr_1.RawExprUtil.usedRef(rawExpr),
        assertDelegate: sd.orNull(dataType.double()),
    }, 
    /**
     * Adapted from `castAsDouble()`
     */
    query_tree_1.Parentheses.Create([
        new query_tree_1.FunctionCall("SUM", [
            raw_expr_1.RawExprUtil.queryTree(cast_1.__internalCastAsDecimal(rawExpr, decimal.maxDigitCount, decimal.fractionalDigitCount))
        ]),
        "+",
        "0e0"
    ]));
    return result;
}
exports.sumAsDecimal = sumAsDecimal;
//# sourceMappingURL=sum-as-decimal.js.map