"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    Not the most efficient but should work.
    Be careful not to use this on large data sets.
*/
function fullOuterJoin({ leftArr, rightArr, predicate, }) {
    const result = [];
    for (const left of leftArr) {
        let hasRight = false;
        for (const right of rightArr) {
            if (predicate(left, right)) {
                hasRight = true;
                result.push({
                    left,
                    right,
                });
            }
        }
        if (!hasRight) {
            result.push({
                left,
                right: undefined,
            });
        }
    }
    for (const right of rightArr) {
        if (leftArr.some(left => predicate(left, right))) {
            continue;
        }
        result.push({
            left: undefined,
            right,
        });
    }
    return result;
}
exports.fullOuterJoin = fullOuterJoin;
//# sourceMappingURL=full-outer-join.js.map