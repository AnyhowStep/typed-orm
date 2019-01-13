"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const predicate_1 = require("../../predicate");
function intersect(arrayA, arrayB) {
    const result = [];
    for (let a of arrayA) {
        for (let b of arrayB) {
            if (predicate_1.isEqual(a, b)) {
                result.push(a);
                break;
            }
        }
    }
    return result;
}
exports.intersect = intersect;
//# sourceMappingURL=intersect.js.map