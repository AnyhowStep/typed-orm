"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const from_column_1 = require("./from-column");
function appendColumnMap(ref, columnMap) {
    for (let columnName in columnMap) {
        from_column_1.appendColumn(ref, columnMap[columnName]);
    }
    return ref;
}
exports.appendColumnMap = appendColumnMap;
function fromColumnMap(columnMap) {
    const result = appendColumnMap({}, columnMap);
    return result;
}
exports.fromColumnMap = fromColumnMap;
//# sourceMappingURL=from-column-map.js.map