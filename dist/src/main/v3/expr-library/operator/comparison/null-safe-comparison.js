"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expr_1 = require("../../../expr");
const raw_expr_1 = require("../../../raw-expr");
const dataType = require("../../../data-type");
/*
    Factory for making null-safe comparison operators.
*/
function nullSafeComparison(operator) {
    const result = (left, right) => {
        return new expr_1.Expr({
            usedColumns: raw_expr_1.RawExprUtil.Array.usedColumns([
                left,
                right
            ]),
            assertDelegate: dataType.boolean(),
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