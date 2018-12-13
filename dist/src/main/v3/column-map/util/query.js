"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_1 = require("../../column");
function queryTree(columnMap) {
    const columnNames = Object.keys(columnMap);
    columnNames.sort();
    const result = [];
    for (let columnName of columnNames) {
        if (result.length > 0) {
            result.push(",");
        }
        result.push(column_1.ColumnUtil.queryTree(columnMap[columnName]));
    }
    return result;
}
exports.queryTree = queryTree;
//# sourceMappingURL=query.js.map