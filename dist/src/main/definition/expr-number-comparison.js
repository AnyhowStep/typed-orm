"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expr_operation_1 = require("./expr-operation");
const column_references_operation_1 = require("./column-references-operation");
const expr_factory_1 = require("./expr-factory");
function numberComparison(operator) {
    function result(left, right) {
        return expr_factory_1.booleanExpr(column_references_operation_1.combineReferences(expr_operation_1.usedColumns(left), expr_operation_1.usedColumns(right)), `${expr_operation_1.querify(left)} ${operator} ${expr_operation_1.querify(right)}`);
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
//# sourceMappingURL=expr-number-comparison.js.map