"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_identifier_map_1 = require("../../../column-identifier-map");
function hasColumnIdentifier(columnMap, columnIdentifier) {
    return column_identifier_map_1.ColumnIdentifierMapUtil.hasColumnIdentifier(columnMap, columnIdentifier);
}
exports.hasColumnIdentifier = hasColumnIdentifier;
function assertHasColumnIdentifier(columnMap, columnIdentifier) {
    column_identifier_map_1.ColumnIdentifierMapUtil.assertHasColumnIdentifier(columnMap, columnIdentifier);
}
exports.assertHasColumnIdentifier = assertHasColumnIdentifier;
function assertHasColumnIdentifiers(columnMap, columnIdentifiers) {
    column_identifier_map_1.ColumnIdentifierMapUtil.assertHasColumnIdentifiers(columnMap, columnIdentifiers);
}
exports.assertHasColumnIdentifiers = assertHasColumnIdentifiers;
//# sourceMappingURL=has-column-identifier.js.map