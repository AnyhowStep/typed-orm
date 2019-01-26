"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expr_1 = require("../expr");
const raw_expr_1 = require("../raw-expr");
const sd = require("schema-decorator");
//https://dev.mysql.com/doc/refman/8.0/en/group-by-functions.html#function_sum
//If there are no matching rows, SUM() returns NULL.
function sum(raw) {
    raw_expr_1.RawExprUtil.assertNonNullable(raw);
    const usedReferences = raw_expr_1.RawExprUtil.usedReferences(raw);
    const query = raw_expr_1.RawExprUtil.querify(raw);
    const expr = new expr_1.Expr(usedReferences, sd.nullable(sd.number()), `SUM(${query})`);
    expr.distinct = () => {
        return new expr_1.Expr(usedReferences, sd.nullable(sd.number()), `SUM(DISTINCT ${query})`);
    };
    return expr;
}
exports.sum = sum;
/*
https://dev.mysql.com/doc/refman/8.0/en/group-by-functions.html#function_sum
If you sum over a string column, you get zero.
If you sum over a boolean, true is one, false is zero.
If you sum over a DATETIME, you get the sum of their UNIX timestamps.
If you sum over NULL, you get NULL.
If you sum over a nullable column, you MAY get NULL, or you may get a number that ignores the NULL columns.
If there are no matching rows, SUM() returns NULL.
*/
function sumUnsafe(raw) {
    const usedReferences = raw_expr_1.RawExprUtil.usedReferences(raw);
    const query = raw_expr_1.RawExprUtil.querify(raw);
    const expr = new expr_1.Expr(usedReferences, sd.nullable(sd.number()), `SUM(${query})`);
    expr.distinct = () => {
        return new expr_1.Expr(usedReferences, sd.nullable(sd.number()), `SUM(DISTINCT ${query})`);
    };
    return expr;
}
exports.sumUnsafe = sumUnsafe;
//# sourceMappingURL=sum.js.map