import {unaryComparison, UnaryComparison} from "./unary-comparison";

//https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#operator_is
export const isTrue : UnaryComparison = unaryComparison("IS TRUE");