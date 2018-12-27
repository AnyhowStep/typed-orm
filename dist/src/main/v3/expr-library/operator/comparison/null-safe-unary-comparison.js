"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expr_1 = require("../../../expr");
const raw_expr_1 = require("../../../raw-expr");
const dataType = require("../../../data-type");
/*
    Factory for making null-safe unary comparison operators.
*/
function nullSafeUnaryComparison(postFixOperator) {
    const result = (rawExpr) => {
        return new expr_1.Expr({
            usedRef: raw_expr_1.RawExprUtil.usedRef(rawExpr),
            assertDelegate: dataType.boolean(),
        }, [
            raw_expr_1.RawExprUtil.queryTree(rawExpr),
            postFixOperator
        ]);
    };
    return result;
}
exports.nullSafeUnaryComparison = nullSafeUnaryComparison;
//# sourceMappingURL=null-safe-unary-comparison.js.map