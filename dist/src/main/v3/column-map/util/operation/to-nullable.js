"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_1 = require("../../../column");
function toNullable(columnMap) {
    const result = {};
    for (let columnName in columnMap) {
        result[columnName] = column_1.ColumnUtil.toNullable(columnMap[columnName]);
    }
    return result;
}
exports.toNullable = toNullable;
//# sourceMappingURL=to-nullable.js.map