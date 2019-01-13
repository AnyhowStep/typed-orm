"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const predicate_1 = require("../../predicate");
function isDisjoint(arrayA, arrayB) {
    for (let a of arrayA) {
        for (let b of arrayB) {
            if (predicate_1.isEqual(a, b)) {
                return false;
            }
        }
    }
    return true;
}
exports.isDisjoint = isDisjoint;
//# sourceMappingURL=is-disjoint.js.map