"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("type-mapping");
/*
    For now, returns a string.
    Converting to a number risks losing precision.
*/
function decimal() {
    return sd.mysql.decimal();
}
exports.decimal = decimal;
decimal.nullable = () => sd.orNull(decimal());
//# sourceMappingURL=decimal.js.map