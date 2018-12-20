"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const null_safe_comparison_1 = require("./null-safe-comparison");
/*
    NULL-safe equal.
    This operator performs an equality comparison like the = operator,
    but returns
    1 rather than NULL if both operands are NULL, and
    0 rather than NULL if one operand is NULL.

    https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#operator_equal-to
*/
exports.nullSafeEq = null_safe_comparison_1.nullSafeComparison("<=>");
//# sourceMappingURL=null-safe-eq.js.map