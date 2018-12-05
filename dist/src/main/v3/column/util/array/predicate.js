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
function assertIsColumnArray(raw) {
    if (!isColumnArray(raw)) {
        throw new Error(`Expected a column array`);
    }
}
exports.assertIsColumnArray = assertIsColumnArray;
//# sourceMappingURL=predicate.js.map