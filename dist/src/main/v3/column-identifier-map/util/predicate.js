"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_identifier_1 = require("../../column-identifier");
function isSubset(a, b) {
    for (let columnNameA in a) {
        const columnA = a[columnNameA];
        const columnB = b[columnNameA];
        if (columnB == undefined) {
            return false;
        }
        if (!column_identifier_1.ColumnIdentifierUtil.isEqual(columnA, columnB)) {
            return false;
        }
    }
    return true;
}
exports.isSubset = isSubset;
function assertIsSubset(a, b) {
    for (let columnNameA in a) {
        const columnA = a[columnNameA];
        const columnB = b[columnNameA];
        if (columnB == undefined) {
            throw new Error(`Column ${columnNameA} is not allowed`);
        }
        column_identifier_1.ColumnIdentifierUtil.assertIsEqual(columnA, columnB);
    }
}
exports.assertIsSubset = assertIsSubset;
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
//# sourceMappingURL=predicate.js.map