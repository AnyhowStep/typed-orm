import * as sd from "schema-decorator";

//Alias for now
export type Decimal = string;
/*
    For now, returns a string.
    Converting to a number risks losing precision.
*/
function decimal () {
    return sd.or(
        sd.numberToString(),
        sd.match(
            /^(\+|\-)?\d+(\.\d+)?$/,
            name => `Expected ${name} to be a DECIMAL string`
        )
    );
}
decimal.nullable = () => sd.nullable(decimal());
export {decimal}