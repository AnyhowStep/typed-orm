import {unaryComparison, UnaryComparison} from "./unary-comparison";

//https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#operator_is-not-null
export const isNotNull : UnaryComparison = unaryComparison("IS NOT NULL");