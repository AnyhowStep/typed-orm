import {nullSafeComparison, NullSafeComparison} from "./null-safe-comparison";

/*
    NULL-safe equal.
    This operator performs an equality comparison like the = operator,
    but returns
    1 rather than NULL if both operands are NULL, and
    0 rather than NULL if one operand is NULL.

    https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#operator_equal-to
*/
export const nullSafeEq : NullSafeComparison = nullSafeComparison("<=>");