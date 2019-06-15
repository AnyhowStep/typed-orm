"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("type-mapping");
function double() {
    return sd.mysql.double();
}
exports.double = double;
double.nullable = () => sd.orNull(double());
//# sourceMappingURL=double.js.map