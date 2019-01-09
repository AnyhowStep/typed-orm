"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_identifier_1 = require("../../../column-identifier");
function hasColumnIdentifier(columnMap, columnIdentifier) {
    const column = columnMap[columnIdentifier.name];
    if (!column_identifier_1.ColumnIdentifierUtil.isColumnIdentifier(column)) {
        return false;
    }
    return column_identifier_1.ColumnIdentifierUtil.isEqual(column, columnIdentifier);
}
exports.hasColumnIdentifier = hasColumnIdentifier;
function assertHasColumnIdentifier(columnMap, columnIdentifier) {
    if (!hasColumnIdentifier(columnMap, columnIdentifier)) {
        throw new Error(`Column ${columnIdentifier.tableAlias}.${columnIdentifier.name} does not exist in column identifier map`);
    }
}
exports.assertHasColumnIdentifier = assertHasColumnIdentifier;
function assertHasColumnIdentifiers(columnMap, columnIdentifiers) {
    for (let columnIdentifier of columnIdentifiers) {
        assertHasColumnIdentifier(columnMap, columnIdentifier);
    }
}
exports.assertHasColumnIdentifiers = assertHasColumnIdentifiers;
//# sourceMappingURL=has-column-identifier.js.map