import * as sd from "type-mapping";
import {double} from "./double";

/*
    Alias for DOUBLE for now.
    JS doesn't have `float` type.
*/
function float () {
    return double();
}
float.nullable = () => sd.orNull(float());
export {float}