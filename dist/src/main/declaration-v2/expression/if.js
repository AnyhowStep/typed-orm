"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const raw_expr_1 = require("../raw-expr");
const column_references_1 = require("../column-references");
const expr_1 = require("../expr");
const sd = require("schema-decorator");
//https://dev.mysql.com/doc/refman/8.0/en/control-flow-functions.html#function_if
//Supposed to be `IF(condition, a, b)`
//but `if` is a reserved keyword.
function ifTrue(condition, trueExpr, falseExpr) {
    raw_expr_1.RawExprUtil.assertNonNullable(condition);
    return new expr_1.Expr(column_references_1.ColumnReferencesUtil.merge(raw_expr_1.RawExprUtil.usedReferences(condition), column_references_1.ColumnReferencesUtil.merge(raw_expr_1.RawExprUtil.usedReferences(trueExpr), raw_expr_1.RawExprUtil.usedReferences(falseExpr))), sd.or(raw_expr_1.RawExprUtil.assertDelegate(trueExpr), raw_expr_1.RawExprUtil.assertDelegate(falseExpr)), `IF(\n\t${raw_expr_1.RawExprUtil.querify(condition)},\n\t${raw_expr_1.RawExprUtil.querify(trueExpr)},\n\t${raw_expr_1.RawExprUtil.querify(falseExpr)}\n)`);
}
exports.ifTrue = ifTrue;
//# sourceMappingURL=if.js.map