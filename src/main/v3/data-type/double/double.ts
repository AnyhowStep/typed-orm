import * as sd from "schema-decorator";

const assertDouble = sd.or(
    sd.finiteNumber(),
    sd.stringToNumber()
);
function double () {
    return assertDouble;
}
double.nullable = () => sd.nullable(double());
export {double}