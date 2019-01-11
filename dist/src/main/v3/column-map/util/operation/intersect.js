"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const left_intersect_1 = require("./left-intersect");
function intersect(columnMapA, columnMapB) {
    const left = left_intersect_1.leftIntersect(columnMapA, columnMapB);
    const right = {};
    for (let columnName in columnMapB) {
        if (columnMapA.hasOwnProperty(columnName)) {
            continue;
        }
        right[columnName] = columnMapB[columnName];
    }
    return {
        ...left,
        ...right,
    };
}
exports.intersect = intersect;
//# sourceMappingURL=intersect.js.map