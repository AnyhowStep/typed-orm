import {nullSafeUnaryComparison, NullSafeUnaryComparison} from "./null-safe-unary-comparison";

//https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#operator_is-null
export const isNull : NullSafeUnaryComparison = nullSafeUnaryComparison("IS NULL");