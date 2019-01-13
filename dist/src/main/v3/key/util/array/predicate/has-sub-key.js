"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const predicate_1 = require("../../predicate");
function hasSubKey(arr, key) {
    for (let k of arr) {
        if (predicate_1.isSubKey(k, key)) {
            return true;
        }
    }
    return false;
}
exports.hasSubKey = hasSubKey;
//# sourceMappingURL=has-sub-key.js.map