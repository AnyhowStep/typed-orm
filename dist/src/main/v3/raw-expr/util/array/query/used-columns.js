"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query = require("../../query");
function usedColumns(arr) {
    const result = [];
    for (let rawExpr of arr) {
        result.push(...query.usedColumns(rawExpr));
    }
    return result;
}
exports.usedColumns = usedColumns;
//# sourceMappingURL=used-columns.js.map