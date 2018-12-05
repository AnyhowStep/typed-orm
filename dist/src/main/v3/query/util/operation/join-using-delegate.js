"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_map_1 = require("../../../column-map");
function joinUsingColumns(columns, aliasedTable) {
    //During run-time, we cannot actually check if the assertDelegate
    //of a column matches...
    return columns.filter(column => column_map_1.ColumnMapUtil.hasColumnIdentifier(aliasedTable.columns, column));
}
exports.joinUsingColumns = joinUsingColumns;
//# sourceMappingURL=join-using-delegate.js.map