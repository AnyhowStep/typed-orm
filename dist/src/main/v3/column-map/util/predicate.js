"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_1 = require("../../column");
const column_identifier_1 = require("../../column-identifier");
function isColumnMap(raw) {
    if (!(raw instanceof Object)) {
        return false;
    }
    for (let columnName in raw) {
        const column = raw[columnName];
        if (!column_1.ColumnUtil.isColumn(column)) {
            return false;
        }
    }
    return true;
}
exports.isColumnMap = isColumnMap;
function hasOneColumn(columnMap) {
    return (Object.keys(columnMap).length == 1);
}
exports.hasOneColumn = hasOneColumn;
function hasColumnIdentifier(columnMap, columnIdentifier) {
    const column = columnMap[columnIdentifier.name];
    if (!column_1.ColumnUtil.isColumn(column)) {
        return false;
    }
    return column_identifier_1.ColumnIdentifierUtil.isEqual(column, columnIdentifier);
}
exports.hasColumnIdentifier = hasColumnIdentifier;
function assertHasColumnIdentifier(columnMap, columnIdentifier) {
    if (!hasColumnIdentifier(columnMap, columnIdentifier)) {
        throw new Error(`Column ${columnIdentifier.tableAlias}.${columnIdentifier.name} does not exist in column map`);
    }
}
exports.assertHasColumnIdentifier = assertHasColumnIdentifier;
function assertHasColumnIdentifiers(columnMap, columnIdentifiers) {
    for (let columnIdentifier of columnIdentifiers) {
        assertHasColumnIdentifier(columnMap, columnIdentifier);
    }
}
exports.assertHasColumnIdentifiers = assertHasColumnIdentifiers;
//# sourceMappingURL=predicate.js.map