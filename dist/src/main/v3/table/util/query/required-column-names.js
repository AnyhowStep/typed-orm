"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isRequired(table, columnName) {
    return ((columnName in table.columns) &&
        table.generated.indexOf(columnName) < 0 &&
        table.isNullable.indexOf(columnName) < 0 &&
        table.hasExplicitDefaultValue.indexOf(columnName) < 0);
}
exports.isRequired = isRequired;
//# sourceMappingURL=required-column-names.js.map