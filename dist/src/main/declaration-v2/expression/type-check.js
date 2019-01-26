"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const raw_expr_1 = require("../raw-expr");
const boolean_expr_1 = require("./boolean-expr");
const column_references_1 = require("../column-references");
const variadicUtil = require("./variadic-util");
const logical_connective_1 = require("./logical-connective");
const logical_connective_2 = require("./logical-connective");
const select_builder_1 = require("../select-builder");
const column_1 = require("../column");
const join_1 = require("../join");
const aliased_table_1 = require("../aliased-table");
select_builder_1.SelectBuilder;
column_1.Column;
join_1.Join;
aliased_table_1.AliasedTable;
function isNull(expr) {
    return boolean_expr_1.booleanExpr(raw_expr_1.RawExprUtil.usedReferences(expr), `${raw_expr_1.RawExprUtil.querify(expr)} IS NULL`);
}
exports.isNull = isNull;
function isNotNull(expr) {
    return boolean_expr_1.booleanExpr(raw_expr_1.RawExprUtil.usedReferences(expr), `${raw_expr_1.RawExprUtil.querify(expr)} IS NOT NULL`);
}
exports.isNotNull = isNotNull;
function typeCheckBinaryOp(operator) {
    function result(left, right) {
        raw_expr_1.RawExprUtil.assertNonNullable(left);
        raw_expr_1.RawExprUtil.assertNonNullable(right);
        return boolean_expr_1.booleanExpr(column_references_1.ColumnReferencesUtil.merge(raw_expr_1.RawExprUtil.usedReferences(left), raw_expr_1.RawExprUtil.usedReferences(right)), `${raw_expr_1.RawExprUtil.querify(left)} ${operator} ${raw_expr_1.RawExprUtil.querify(right)}`);
    }
    Object.defineProperty(result, "name", {
        value: operator,
    });
    return result;
}
exports.eq = typeCheckBinaryOp("=");
exports.notEq = typeCheckBinaryOp("!=");
function isNotNullAndEq(left, right) {
    let result = boolean_expr_1.booleanExpr(column_references_1.ColumnReferencesUtil.merge(raw_expr_1.RawExprUtil.usedReferences(left), raw_expr_1.RawExprUtil.usedReferences(right)), `${raw_expr_1.RawExprUtil.querify(left)} = ${raw_expr_1.RawExprUtil.querify(right)}`);
    if (raw_expr_1.RawExprUtil.isNullable(left)) {
        result = logical_connective_1.and(isNotNull(left), result);
    }
    if (raw_expr_1.RawExprUtil.isNullable(right)) {
        result = logical_connective_1.and(isNotNull(right), result);
    }
    return result;
}
exports.isNotNullAndEq = isNotNullAndEq;
//`in` is a reserved keyword
function isIn(left, ...rightArr) {
    if (rightArr.length == 0) {
        return logical_connective_2.FALSE;
    }
    const q = variadicUtil.querifyNonNullable(left, ...rightArr);
    return boolean_expr_1.booleanExpr(q.used, `${q.leftQuery} IN(${q.rightQueries.join(",")})`);
}
exports.isIn = isIn;
//# sourceMappingURL=type-check.js.map