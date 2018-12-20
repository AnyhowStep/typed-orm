"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const expr_1 = require("../../../expr");
const raw_expr_1 = require("../../../raw-expr");
/*
    Factory for making ternary comparison operators.
*/
function ternaryComparison(leftOperator, rightOperator) {
    const result = (left, mid, right) => {
        return new expr_1.Expr({
            usedRef: raw_expr_1.RawExprUtil.intersectUsedRefTuple([left, mid, right]),
            assertDelegate: sd.numberToBoolean(),
        }, [
            raw_expr_1.RawExprUtil.queryTree(left),
            leftOperator,
            raw_expr_1.RawExprUtil.queryTree(mid),
            rightOperator,
            raw_expr_1.RawExprUtil.queryTree(right),
        ]);
    };
    return result;
}
exports.ternaryComparison = ternaryComparison;
//# sourceMappingURL=ternary-comparison.js.map