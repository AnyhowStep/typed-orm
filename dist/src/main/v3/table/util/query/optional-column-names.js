"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isOptional(table, columnName) {
    return ((table.isNullable.indexOf(columnName) >= 0 ||
        table.hasExplicitDefaultValue.indexOf(columnName) >= 0) &&
        table.generated.indexOf(columnName) < 0);
}
exports.isOptional = isOptional;
//# sourceMappingURL=optional-column-names.js.map