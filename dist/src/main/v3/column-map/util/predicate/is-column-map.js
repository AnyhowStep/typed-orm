"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_1 = require("../../../column");
function isColumnMap(raw) {
    if (!(raw instanceof Object)) {
        return false;
    }
    if (raw instanceof Array) {
        return false;
    }
    if (raw instanceof Function) {
        return false;
    }
    if (raw instanceof Date) {
        return false;
    }
    for (let columnName in raw) {
        const column = raw[columnName];
        if (!column_1.ColumnUtil.isColumn(column)) {
            return false;
        }
    }
    return true;
}
exports.isColumnMap = isColumnMap;
//# sourceMappingURL=is-column-map.js.map