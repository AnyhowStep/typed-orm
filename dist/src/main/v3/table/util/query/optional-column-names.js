"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_names_1 = require("./column-names");
function isOptional(table, columnName) {
    return ((table.isNullable.indexOf(columnName) >= 0 ||
        table.hasExplicitDefaultValue.indexOf(columnName) >= 0) &&
        table.generated.indexOf(columnName) < 0);
}
exports.isOptional = isOptional;
function optionalColumnNames(table) {
    return column_names_1.columnNames(table).filter(columnName => isOptional(table, columnName));
}
exports.optionalColumnNames = optionalColumnNames;
//# sourceMappingURL=optional-column-names.js.map