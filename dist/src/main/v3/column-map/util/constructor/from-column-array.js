"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function fromColumnArray(columns) {
    const result = {};
    for (let column of columns) {
        result[column.name] = column;
    }
    return result;
}
exports.fromColumnArray = fromColumnArray;
//# sourceMappingURL=from-column-array.js.map