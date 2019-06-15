"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("type-mapping");
function nullableColumnNames(columnMap) {
    return Object.keys(columnMap)
        .filter(columnName => sd.canOutputNull(columnMap[columnName].assertDelegate));
}
exports.nullableColumnNames = nullableColumnNames;
//# sourceMappingURL=nullable-column-names.js.map