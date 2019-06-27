"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const raw_expr_1 = require("../../../raw-expr");
const expr_1 = require("../../../expr");
const dataType = require("../../../data-type");
const function_1 = require("../../function");
/**
 * https://dev.mysql.com/doc/refman/8.0/en/arithmetic-functions.html#operator_plus
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
 * The solution is to convert the values to a `DECIMAL(M, D)` type, add those,
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
function addAsDecimal(decimal, ...arr) {
    const decimalArr = arr.map(rawExpr => function_1.__internalCastAsDecimal(rawExpr, decimal.maxDigitCount, decimal.fractionalDigitCount));
    const usedRef = raw_expr_1.RawExprUtil.intersectUsedRefTuple(...arr);
    const queryTree = [];
    for (let rawExpr of decimalArr) {
        if (queryTree.length > 0) {
            queryTree.push("+");
        }
        queryTree.push(raw_expr_1.RawExprUtil.queryTree(rawExpr));
    }
    if (queryTree.length == 0) {
        //By convention, adding zero numbers is zero.
        return new expr_1.Expr({
            usedRef: usedRef,
            assertDelegate: dataType.double(),
        }, raw_expr_1.RawExprUtil.queryTree(0));
    }
    else {
        //Adapter from `castAsDouble()`
        queryTree.push("+");
        queryTree.push("0e0");
        return new expr_1.Expr({
            usedRef: usedRef,
            assertDelegate: dataType.double(),
        }, queryTree);
    }
}
exports.addAsDecimal = addAsDecimal;
//# sourceMappingURL=add-as-decimal.js.map