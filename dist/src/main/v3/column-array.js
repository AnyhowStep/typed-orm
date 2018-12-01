"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ColumnArrayUtil;
(function (ColumnArrayUtil) {
    function fromColumnMap(columnMap) {
        return Object.keys(columnMap)
            .map((columnName) => {
            return columnMap[columnName];
        });
    }
    ColumnArrayUtil.fromColumnMap = fromColumnMap;
})(ColumnArrayUtil = exports.ColumnArrayUtil || (exports.ColumnArrayUtil = {}));
//# sourceMappingURL=column-array.js.map