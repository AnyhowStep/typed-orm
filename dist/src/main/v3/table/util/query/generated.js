"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isGenerated(table, columnName) {
    return (table.generated.indexOf(columnName) >= 0);
}
exports.isGenerated = isGenerated;
//# sourceMappingURL=generated.js.map