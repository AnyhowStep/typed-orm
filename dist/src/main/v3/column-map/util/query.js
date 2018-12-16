"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getSortedColumnArray(columnMap) {
    const columnNames = Object.keys(columnMap);
    columnNames.sort();
    const result = [];
    for (let columnName of columnNames) {
        result.push(columnMap[columnName]);
    }
    return result;
}
exports.getSortedColumnArray = getSortedColumnArray;
//# sourceMappingURL=query.js.map