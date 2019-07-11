"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("type-mapping");
const raw_expr_1 = require("../../../../raw-expr");
const expr_1 = require("../../../../expr");
const column_ref_1 = require("../../../../column-ref");
const dataType = require("../../../../data-type");
const function_1 = require("../../../function");
//https://dev.mysql.com/doc/refman/8.0/en/arithmetic-functions.html#operator_div
function integerDiv(left, right) {
    return new expr_1.Expr({
        usedRef: column_ref_1.ColumnRefUtil.intersect(raw_expr_1.RawExprUtil.usedRef(left), raw_expr_1.RawExprUtil.usedRef(right)),
        assertDelegate: sd.orNull(dataType.bigint()),
    }, [
        raw_expr_1.RawExprUtil.queryTree(left),
        "DIV",
        raw_expr_1.RawExprUtil.queryTree(right),
    ]);
}
exports.integerDiv = integerDiv;
/**
 * We cannot always perform integer division naively in SQL.
 *
 * Error #1690 - BIGINT UNSIGNED value is out of range
 * ```sql
 * SELECT CAST(2 AS UNSIGNED INTEGER) DIV CAST(-1 AS SIGNED INTEGER)
 * ```
 *
 * -----
 *
 * If either `x` or `y` are `UNSIGNED`,
 * we need to cast both to `SIGNED` before performing integer division,
 * if we want to allow negative numbers.
 *
 * ```sql
 * SELECT CAST(x AS SIGNED INTEGER) DIV CAST(y AS SIGNED INTEGER)
 * ```
 *
 * @param arr
 */
function integerDivAsSignedInteger(left, right) {
    return integerDiv(function_1.castAsSignedInteger(left), function_1.castAsSignedInteger(right));
}
exports.integerDivAsSignedInteger = integerDivAsSignedInteger;
//# sourceMappingURL=integer-div.js.map