"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const raw_expr_1 = require("../raw-expr");
const boolean_expr_1 = require("./boolean-expr");
const variadicUtil = require("./variadic-util");
const column_references_1 = require("../column-references");
const logical_connective_1 = require("./logical-connective");
const select_builder_1 = require("../select-builder");
const column_1 = require("../column");
select_builder_1.SelectBuilder;
column_1.Column;
function unsafeTypeCheckBinaryOp(operator) {
    function result(left, right) {
        return boolean_expr_1.nullableBooleanExpr(column_references_1.ColumnReferencesUtil.merge(raw_expr_1.RawExprUtil.usedReferences(left), raw_expr_1.RawExprUtil.usedReferences(right)), `${raw_expr_1.RawExprUtil.querify(left)} ${operator} ${raw_expr_1.RawExprUtil.querify(right)}`);
    }
    Object.defineProperty(result, "name", {
        value: operator,
    });
    return result;
}
exports.unsafeTypeCheckBinaryOp = unsafeTypeCheckBinaryOp;
exports.unsafeEq = unsafeTypeCheckBinaryOp("=");
exports.unsafeNotEq = unsafeTypeCheckBinaryOp("!=");
function unsafeIsIn(left, ...rightArr) {
    if (rightArr.length == 0) {
        return logical_connective_1.FALSE;
    }
    const q = variadicUtil.querifyNullable(left, ...rightArr);
    return boolean_expr_1.nullableBooleanExpr(q.used, `${q.leftQuery} IN(${q.rightQueries.join(",")})`);
}
exports.unsafeIsIn = unsafeIsIn;
//# sourceMappingURL=unsafe-type-check.js.map