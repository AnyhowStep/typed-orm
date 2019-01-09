"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const predicate_1 = require("../../predicate");
function assertDisjoint(arrA, arrB) {
    for (let a of arrA) {
        for (let b of arrB) {
            if (predicate_1.isEqual(a, b)) {
                throw new Error(`Duplicate column identifier ${a.tableAlias}.${a.name} found; consider aliasing`);
            }
        }
    }
}
exports.assertDisjoint = assertDisjoint;
//# sourceMappingURL=assert-disjoint.js.map