"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_1 = require("../../../column");
function withTableAlias(columnMap, newTableAlias) {
    const result = {};
    for (let columnName in columnMap) {
        result[columnName] = column_1.ColumnUtil.withTableAlias(columnMap[columnName], newTableAlias);
    }
    return result;
}
exports.withTableAlias = withTableAlias;
//# sourceMappingURL=with-table-alias.js.map