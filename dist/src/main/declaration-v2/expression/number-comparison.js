"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const boolean_expr_1 = require("./boolean-expr");
const raw_expr_1 = require("../raw-expr");
const column_references_1 = require("../column-references");
const select_builder_1 = require("../select-builder");
const column_1 = require("../column");
const aliased_expr_1 = require("../aliased-expr");
const join_1 = require("../join");
const aliased_table_1 = require("../aliased-table");
select_builder_1.SelectBuilder;
column_1.Column;
aliased_expr_1.AliasedExpr;
join_1.Join;
aliased_table_1.AliasedTable;
function numberComparison(operator) {
    function result(left, right) {
        raw_expr_1.RawExprUtil.assertNonNullable(left);
        raw_expr_1.RawExprUtil.assertNonNullable(right);
        return boolean_expr_1.booleanExpr(column_references_1.ColumnReferencesUtil.merge(raw_expr_1.RawExprUtil.usedReferences(left), raw_expr_1.RawExprUtil.usedReferences(right)), 
        //TODO More readable queries
        `${raw_expr_1.RawExprUtil.querify(left)} ${operator} ${raw_expr_1.RawExprUtil.querify(right)}`);
    }
    Object.defineProperty(result, "name", {
        value: operator,
    });
    return result;
}
exports.lt = numberComparison("<");
exports.gt = numberComparison(">");
exports.ltEq = numberComparison("<=");
exports.gtEq = numberComparison(">=");
//# sourceMappingURL=number-comparison.js.map