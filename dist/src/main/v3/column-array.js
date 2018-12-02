"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_1 = require("./column");
var ColumnArrayUtil;
(function (ColumnArrayUtil) {
    function fromColumnMap(columnMap) {
        return Object.keys(columnMap)
            .map((columnName) => {
            return columnMap[columnName];
        });
    }
    ColumnArrayUtil.fromColumnMap = fromColumnMap;
    function isColumnArray(raw) {
        if (!(raw instanceof Array)) {
            return false;
        }
        for (let item of raw) {
            if (!column_1.Column.isColumn(item)) {
                return false;
            }
        }
        return true;
    }
    ColumnArrayUtil.isColumnArray = isColumnArray;
})(ColumnArrayUtil = exports.ColumnArrayUtil || (exports.ColumnArrayUtil = {}));
//# sourceMappingURL=column-array.js.map