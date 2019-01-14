"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const double_1 = require("./double");
/*
    Alias for DOUBLE for now.
    JS doesn't have `float` type.
*/
function float() {
    return double_1.double();
}
exports.float = float;
float.nullable = () => sd.nullable(float());
//# sourceMappingURL=float.js.map