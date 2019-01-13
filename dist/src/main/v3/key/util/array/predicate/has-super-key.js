"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const predicate_1 = require("../../predicate");
function hasSuperKey(arr, key) {
    for (let k of arr) {
        if (predicate_1.isSubKey(key, k)) {
            return true;
        }
    }
    return false;
}
exports.hasSuperKey = hasSuperKey;
//# sourceMappingURL=has-super-key.js.map