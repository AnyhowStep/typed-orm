"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const predicate_1 = require("../../predicate");
function assertNoDuplicate(arr) {
    for (let i = 0; i < arr.length; ++i) {
        for (let j = i + 1; j < arr.length; ++j) {
            if (predicate_1.isEqual(arr[i], arr[j])) {
                throw new Error(`Duplicate column identifier ${arr[i].tableAlias}.${arr[i].name}`);
            }
        }
    }
}
exports.assertNoDuplicate = assertNoDuplicate;
//# sourceMappingURL=assert-no-duplicate.js.map