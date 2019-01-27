"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expr_1 = require("../../../expr");
const raw_expr_1 = require("../../../raw-expr");
const dataType = require("../../../data-type");
/*
    Factory for making unary comparison operators.
*/
function unaryComparison(postFixOperator) {
    const result = (rawExpr) => {
        return new expr_1.Expr({
            usedColumns: raw_expr_1.RawExprUtil.usedColumns(rawExpr),
            assertDelegate: dataType.boolean(),
        }, [
            raw_expr_1.RawExprUtil.queryTree(rawExpr),
            postFixOperator
        ]);
    };
    return result;
}
exports.unaryComparison = unaryComparison;
//# sourceMappingURL=unary-comparison.js.map