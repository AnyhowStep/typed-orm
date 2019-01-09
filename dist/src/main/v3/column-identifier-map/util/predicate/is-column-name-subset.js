"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Only checks column.name, not column.tableAlias
function assertIsColumnNameSubset(a, b) {
    for (let columnNameA in a) {
        const columnB = b[columnNameA];
        if (columnB == undefined) {
            throw new Error(`Column ${columnNameA} is not allowed`);
        }
    }
}
exports.assertIsColumnNameSubset = assertIsColumnNameSubset;
//# sourceMappingURL=is-column-name-subset.js.map