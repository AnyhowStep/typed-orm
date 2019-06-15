import * as sd from "type-mapping";

//Alias for now
export type Decimal = string;
/*
    For now, returns a string.
    Converting to a number risks losing precision.
*/
function decimal () {
    return sd.mysql.decimal();
}
decimal.nullable = () => sd.orNull(decimal());
export {decimal}