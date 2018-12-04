"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const predicate_1 = require("../predicate");
function isColumnArray(raw) {
    if (!(raw instanceof Array)) {
        return false;
    }
    for (let item of raw) {
        if (!predicate_1.isColumn(item)) {
            return false;
        }
    }
    return true;
}
exports.isColumnArray = isColumnArray;
//# sourceMappingURL=predicate.js.map