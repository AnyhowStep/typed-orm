"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getColumnsWithName(table, columnName) {
    const result = [];
    if (columnName in table.columns) {
        result.push(table.columns[columnName]);
    }
    for (let p of table.parents) {
        if (columnName in p.columns) {
            result.push(p.columns[columnName]);
        }
    }
    return result;
}
exports.getColumnsWithName = getColumnsWithName;
//# sourceMappingURL=get-columns-with-name.js.map