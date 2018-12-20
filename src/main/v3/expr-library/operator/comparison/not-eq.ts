import {comparison, Comparison} from "./comparison";

//https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#operator_not-equal
//ANSI standard to use <>
//The other, !=, works, too
export const notEq : Comparison = comparison("<>");