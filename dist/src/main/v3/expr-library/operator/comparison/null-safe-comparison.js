"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const expr_1 = require("../../../expr");
const raw_expr_1 = require("../../../raw-expr");
const column_ref_1 = require("../../../column-ref");
/*
    Factory for making null-safe comparison operators.
*/
function nullSafeComparison(operator) {
    const result = (left, right) => {
        return new expr_1.Expr({
            usedRef: column_ref_1.ColumnRefUtil.intersect(raw_expr_1.RawExprUtil.usedRef(left), raw_expr_1.RawExprUtil.usedRef(right)),
            assertDelegate: sd.numberToBoolean(),
        }, [
            raw_expr_1.RawExprUtil.queryTree(left),
            operator,
            raw_expr_1.RawExprUtil.queryTree(right),
        ]);
    };
    return result;
}
exports.nullSafeComparison = nullSafeComparison;
//# sourceMappingURL=null-safe-comparison.js.map