"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const expr_1 = require("../../../expr");
const raw_expr_1 = require("../../../raw-expr");
/*
    Factory for making unary comparison operators.
*/
function unaryComparison(postFixOperator) {
    const result = (rawExpr) => {
        return new expr_1.Expr({
            usedRef: raw_expr_1.RawExprUtil.usedRef(rawExpr),
            assertDelegate: sd.numberToBoolean(),
        }, [
            raw_expr_1.RawExprUtil.queryTree(rawExpr),
            postFixOperator
        ]);
    };
    return result;
}
exports.unaryComparison = unaryComparison;
//# sourceMappingURL=unary-comparison.js.map