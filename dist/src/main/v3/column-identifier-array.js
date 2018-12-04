"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_identifier_1 = require("./column-identifier");
var ColumnIdentifierArrayUtil;
(function (ColumnIdentifierArrayUtil) {
    function fromColumnMap(columnMap) {
        const columnNames = Object.keys(columnMap);
        return columnNames.map((columnName) => {
            const column = columnMap[columnName];
            return column_identifier_1.ColumnIdentifierUtil.fromColumn(column);
        });
    }
    ColumnIdentifierArrayUtil.fromColumnMap = fromColumnMap;
})(ColumnIdentifierArrayUtil = exports.ColumnIdentifierArrayUtil || (exports.ColumnIdentifierArrayUtil = {}));
//# sourceMappingURL=column-identifier-array.js.map