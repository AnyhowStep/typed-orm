import * as sd from "schema-decorator";

const assertDouble = sd.or(
    sd.finiteNumber(),
    sd.stringToNumber()
);
export function double () {
    return assertDouble;
}
double.nullable = () => sd.nullable(double());