"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
function nullableColumnNames(columnMap) {
    return Object.keys(columnMap)
        .filter(columnName => sd.isNullable(columnMap[columnName].assertDelegate));
}
exports.nullableColumnNames = nullableColumnNames;
//# sourceMappingURL=nullable-column-names.js.map