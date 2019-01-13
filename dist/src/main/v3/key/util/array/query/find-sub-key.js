"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const predicate_1 = require("../../predicate");
function findSubKeys(arr, key) {
    const result = [];
    for (let k of arr) {
        if (predicate_1.isSubKey(k, key)) {
            result.push(k);
        }
    }
    return result;
}
exports.findSubKeys = findSubKeys;
//# sourceMappingURL=find-sub-key.js.map