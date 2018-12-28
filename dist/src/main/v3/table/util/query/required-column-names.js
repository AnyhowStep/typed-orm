"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_names_1 = require("./column-names");
function isRequired(table, columnName) {
    return ((columnName in table.columns) &&
        table.generated.indexOf(columnName) < 0 &&
        table.isNullable.indexOf(columnName) < 0 &&
        table.hasExplicitDefaultValue.indexOf(columnName) < 0);
}
exports.isRequired = isRequired;
function requiredColumnNames(table) {
    return column_names_1.columnNames(table).filter(columnName => isRequired(table, columnName));
}
exports.requiredColumnNames = requiredColumnNames;
//# sourceMappingURL=required-column-names.js.map