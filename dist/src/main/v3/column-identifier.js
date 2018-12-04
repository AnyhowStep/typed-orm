"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ColumnIdentifierUtil;
(function (ColumnIdentifierUtil) {
    function fromColumn(column) {
        const result = {
            tableAlias: column.tableAlias,
            name: column.name,
        };
        return result;
    }
    ColumnIdentifierUtil.fromColumn = fromColumn;
    function isEqual(a, b) {
        return (a.tableAlias == b.tableAlias &&
            a.name == b.name);
    }
    ColumnIdentifierUtil.isEqual = isEqual;
    function assertIsEqual(a, b) {
        if (a.tableAlias != b.tableAlias) {
            throw new Error(`Table alias mismatch ${a.tableAlias} != ${b.tableAlias}`);
        }
        if (a.name != b.name) {
            throw new Error(`Name mismatch ${a.name} != ${b.name}`);
        }
    }
    ColumnIdentifierUtil.assertIsEqual = assertIsEqual;
})(ColumnIdentifierUtil = exports.ColumnIdentifierUtil || (exports.ColumnIdentifierUtil = {}));
//# sourceMappingURL=column-identifier.js.map