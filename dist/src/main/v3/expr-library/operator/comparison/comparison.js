"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expr_1 = require("../../../expr");
const raw_expr_1 = require("../../../raw-expr");
const column_ref_1 = require("../../../column-ref");
const dataType = require("../../../data-type");
/*
    Factory for making comparison operators.
*/
function comparison(operator) {
    const result = (left, right) => {
        return new expr_1.Expr({
            usedRef: column_ref_1.ColumnRefUtil.intersect(raw_expr_1.RawExprUtil.usedRef(left), raw_expr_1.RawExprUtil.usedRef(right)),
            assertDelegate: dataType.boolean(),
        }, [
            raw_expr_1.RawExprUtil.queryTree(left),
            operator,
            raw_expr_1.RawExprUtil.queryTree(right),
        ]);
    };
    return result;
}
exports.comparison = comparison;
//# sourceMappingURL=comparison.js.map