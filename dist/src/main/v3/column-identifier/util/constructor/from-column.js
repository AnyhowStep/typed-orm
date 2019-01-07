"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function fromColumn(column) {
    const result = {
        tableAlias: column.tableAlias,
        name: column.name,
    };
    return result;
}
exports.fromColumn = fromColumn;
//# sourceMappingURL=from-column.js.map