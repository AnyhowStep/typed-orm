"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
function getSortedColumnArray(columnMap) {
    const columnNames = Object.keys(columnMap);
    columnNames.sort();
    const result = [];
    for (let columnName of columnNames) {
        result.push(columnMap[columnName]);
    }
    return result;
}
exports.getSortedColumnArray = getSortedColumnArray;
function columnNames(columnMap) {
    //Technically, this could be wrong.
    //But it shouldn't be wrong, in general.
    return Object.keys(columnMap);
}
exports.columnNames = columnNames;
function nullableColumnNames(columnMap) {
    return Object.keys(columnMap)
        .filter(columnName => sd.isNullable(columnMap[columnName].assertDelegate));
}
exports.nullableColumnNames = nullableColumnNames;
//# sourceMappingURL=query.js.map