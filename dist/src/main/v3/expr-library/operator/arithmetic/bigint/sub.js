"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const raw_expr_1 = require("../../../../raw-expr");
const expr_1 = require("../../../../expr");
const dataType = require("../../../../data-type");
const function_1 = require("../../../function");
//https://dev.mysql.com/doc/refman/8.0/en/arithmetic-functions.html#operator_minus
function bigIntSub(...arr) {
    const usedRef = raw_expr_1.RawExprUtil.intersectUsedRefTuple(...arr);
    const queryTree = [];
    for (let rawExpr of arr) {
        if (queryTree.length > 0) {
            queryTree.push("-");
        }
        queryTree.push(raw_expr_1.RawExprUtil.queryTree(rawExpr));
    }
    if (queryTree.length == 0) {
        //By convention, the subtraction of zero numbers is zero
        return new expr_1.Expr({
            usedRef: usedRef,
            assertDelegate: dataType.bigint(),
        }, raw_expr_1.RawExprUtil.queryTree(0));
    }
    else {
        return new expr_1.Expr({
            usedRef: usedRef,
            assertDelegate: dataType.bigint(),
        }, queryTree);
    }
}
exports.bigIntSub = bigIntSub;
/**
 * We cannot always perform integer subtraction naively in SQL.
 *
 * Error #1690 - BIGINT UNSIGNED value is out of range
 * ```sql
 * SELECT CAST(1 AS UNSIGNED INTEGER) - CAST(2 AS SIGNED INTEGER)
 * ```
 *
 * -----
 *
 * If either `x` or `y` are `UNSIGNED`,
 * we need to cast both to `SIGNED` before performing subtraction,
 * if we want to allow negative numbers.
 *
 * ```sql
 * SELECT CAST(x AS SIGNED INTEGER) - CAST(y AS SIGNED INTEGER)
 * ```
 *
 * @param arr
 */
function bigIntSubAsSignedInteger(...arr) {
    return bigIntSub(...arr.map(x => function_1.castAsSignedInteger(x)));
}
exports.bigIntSubAsSignedInteger = bigIntSubAsSignedInteger;
//# sourceMappingURL=sub.js.map