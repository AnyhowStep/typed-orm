import {ternaryComparison, TernaryComparison} from "./ternary-comparison";

//https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#operator_not-between
export const notBetween : TernaryComparison = ternaryComparison("NOT BETWEEN", "AND");