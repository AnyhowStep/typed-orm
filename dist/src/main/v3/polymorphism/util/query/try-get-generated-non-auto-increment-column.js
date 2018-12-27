"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function tryGetGeneratedNonAutoIncrementColumn(table, columnName) {
    if (table.generated.indexOf(columnName) >= 0 &&
        table.autoIncrement != columnName) {
        return table.columns[columnName];
    }
    for (let parent of table.parents) {
        if (parent.generated.indexOf(columnName) >= 0 &&
            parent.autoIncrement != columnName) {
            return parent.columns[columnName];
        }
    }
    return undefined;
}
exports.tryGetGeneratedNonAutoIncrementColumn = tryGetGeneratedNonAutoIncrementColumn;
//# sourceMappingURL=try-get-generated-non-auto-increment-column.js.map