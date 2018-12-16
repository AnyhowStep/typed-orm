"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_identifier_map_1 = require("../../column-identifier-map");
function hasColumnIdentifier(columnRef, columnIdentifier) {
    if (!columnRef.hasOwnProperty(columnIdentifier.tableAlias)) {
        return false;
    }
    const columnMap = columnRef[columnIdentifier.tableAlias];
    return column_identifier_map_1.ColumnIdentifierMapUtil.hasColumnIdentifier(columnMap, columnIdentifier);
}
exports.hasColumnIdentifier = hasColumnIdentifier;
function assertHasColumnIdentifier(columnRef, columnIdentifier) {
    if (!hasColumnIdentifier(columnRef, columnIdentifier)) {
        throw new Error(`Column ${columnIdentifier.tableAlias}.${columnIdentifier.name} does not exist in column identifier ref`);
    }
}
exports.assertHasColumnIdentifier = assertHasColumnIdentifier;
function assertHasColumnIdentifiers(columnRef, columnIdentifiers) {
    for (let columnIdentifier of columnIdentifiers) {
        assertHasColumnIdentifier(columnRef, columnIdentifier);
    }
}
exports.assertHasColumnIdentifiers = assertHasColumnIdentifiers;
//# sourceMappingURL=predicate.js.map