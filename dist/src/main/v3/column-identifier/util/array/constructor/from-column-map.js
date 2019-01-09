"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Ctor = require("../../constructor");
function fromColumnMap(columnMap) {
    const result = [];
    for (let columnName in columnMap) {
        result.push(Ctor.fromColumn(columnMap[columnName]));
    }
    return result;
}
exports.fromColumnMap = fromColumnMap;
//# sourceMappingURL=from-column-map.js.map