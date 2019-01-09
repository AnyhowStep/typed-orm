"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_identifier_1 = require("../../../column-identifier");
function appendColumn(ref, column) {
    let map = ref[column.tableAlias];
    if (map == undefined) {
        map = {};
        ref[column.tableAlias] = map;
    }
    map[column.name] = column_identifier_1.ColumnIdentifierUtil.fromColumn(column);
    return ref;
}
exports.appendColumn = appendColumn;
//# sourceMappingURL=from-column.js.map