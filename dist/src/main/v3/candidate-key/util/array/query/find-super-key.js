"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const predicate_1 = require("../../predicate");
function findSuperKeys(arr, key) {
    const result = [];
    for (let k of arr) {
        if (predicate_1.isSubKey(key, k)) {
            result.push(k);
        }
    }
    return result;
}
exports.findSuperKeys = findSuperKeys;
//# sourceMappingURL=find-super-key.js.map