"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_identifier_1 = require("../../column-identifier");
function fromColumnMap(columnMap) {
    return Object.keys(columnMap).reduce((memo, columnName) => {
        memo[columnName] = column_identifier_1.ColumnIdentifierUtil.fromColumn(columnMap[columnName]);
        return memo;
    }, {});
}
exports.fromColumnMap = fromColumnMap;
//# sourceMappingURL=constructor.js.map