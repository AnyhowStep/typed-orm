import * as sd from "type-mapping";

function double () {
    return sd.mysql.double();
}
double.nullable = () => sd.orNull(double());
export {double}