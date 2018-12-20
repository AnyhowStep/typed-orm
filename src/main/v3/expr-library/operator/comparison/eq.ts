import {comparison, Comparison} from "./comparison";

//Interestingly enough, if I remove the `Comparison` explicit type annotation,
//TS takes *much* longer to compile.
//https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#operator_equal
export const eq : Comparison = comparison("=");