"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const predicate_1 = require("../../predicate");
function isKeyArray(raw) {
    if (!(raw instanceof Array)) {
        return false;
    }
    for (let item of raw) {
        if (!predicate_1.isKey(item)) {
            return false;
        }
    }
    return true;
}
exports.isKeyArray = isKeyArray;
//# sourceMappingURL=is-key-array.js.map