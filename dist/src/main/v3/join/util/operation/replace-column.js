"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_1 = require("../../join");
const column_identifier_map_1 = require("../../../column-identifier-map");
function replaceColumn(join, column) {
    if (!column_identifier_map_1.ColumnIdentifierMapUtil.hasColumnIdentifier(join.columns, column)) {
        return join;
    }
    const columns = {};
    for (let columnName in join.columns) {
        if (columnName == column.name) {
            columns[columnName] = column;
        }
        else {
            columns[columnName] = join.columns[columnName];
        }
    }
    return new join_1.Join({
        aliasedTable: join.aliasedTable,
        columns: columns,
        nullable: join.nullable,
    }, join.joinType, join.from, join.to);
}
exports.replaceColumn = replaceColumn;
//# sourceMappingURL=replace-column.js.map