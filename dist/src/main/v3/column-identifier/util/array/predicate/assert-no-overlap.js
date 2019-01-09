"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const predicate_1 = require("../../predicate");
function assertNoOverlap(arrA, arrB) {
    for (let a of arrA) {
        for (let b of arrB) {
            if (predicate_1.isEqual(a, b)) {
                throw new Error(`Duplicate column identifier ${a.tableAlias}.${a.name} found; consider aliasing`);
            }
        }
    }
}
exports.assertNoOverlap = assertNoOverlap;
//# sourceMappingURL=assert-no-overlap.js.map