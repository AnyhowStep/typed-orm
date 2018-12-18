"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const expr_1 = require("../../../expr");
const raw_expr_1 = require("../../../raw-expr");
const column_ref_1 = require("../../../column-ref");
/*
    NULL-safe equal.
    This operator performs an equality comparison like the = operator,
    but returns
    1 rather than NULL if both operands are NULL, and
    0 rather than NULL if one operand is NULL.

    https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#operator_equal-to
*/
function nullSafeEq(left, right) {
    return new expr_1.Expr({
        usedRef: column_ref_1.ColumnRefUtil.intersect(raw_expr_1.RawExprUtil.usedRef(left), raw_expr_1.RawExprUtil.usedRef(right)),
        assertDelegate: sd.numberToBoolean(),
    }, [
        raw_expr_1.RawExprUtil.queryTree(left),
        "<=>",
        raw_expr_1.RawExprUtil.queryTree(right),
    ]);
}
exports.nullSafeEq = nullSafeEq;
//# sourceMappingURL=null-safe-eq.js.map