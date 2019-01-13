"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const predicate_1 = require("../../predicate");
function hasKey(arr, key) {
    for (let k of arr) {
        if (predicate_1.isEqual(k, key)) {
            return true;
        }
    }
    return false;
}
exports.hasKey = hasKey;
//# sourceMappingURL=has-key.js.map