"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ColumnIdentifierArrayUtil;
(function (ColumnIdentifierArrayUtil) {
    function fromColumnMap(columnMap) {
        const columnNames = Object.keys(columnMap);
        return columnNames.map((columnName) => ({
            tableAlias: columnMap[columnName].tableAlias,
            name: columnName,
        }));
    }
    ColumnIdentifierArrayUtil.fromColumnMap = fromColumnMap;
})(ColumnIdentifierArrayUtil = exports.ColumnIdentifierArrayUtil || (exports.ColumnIdentifierArrayUtil = {}));
//# sourceMappingURL=column-identifier-array.js.map