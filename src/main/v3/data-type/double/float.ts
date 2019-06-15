import * as sd from "schema-decorator";
import {double} from "./double";

/*
    Alias for DOUBLE for now.
    JS doesn't have `float` type.
*/
function float () {
    return double();
}
float.nullable = () => sd.nullable(float());
export {float}