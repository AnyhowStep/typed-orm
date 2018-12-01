"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ColumnIdentifierUtil;
(function (ColumnIdentifierUtil) {
    function fromColumn(column) {
        return {
            tableAlias: column.tableAlias,
            name: column.name,
        };
    }
    ColumnIdentifierUtil.fromColumn = fromColumn;
})(ColumnIdentifierUtil = exports.ColumnIdentifierUtil || (exports.ColumnIdentifierUtil = {}));
//# sourceMappingURL=column-identifier.js.map