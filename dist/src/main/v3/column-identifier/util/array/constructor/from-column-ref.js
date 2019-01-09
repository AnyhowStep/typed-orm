"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const from_column_map_1 = require("./from-column-map");
function fromColumnRef(columnRef) {
    const result = [];
    for (let tableAlias in columnRef) {
        result.push(...from_column_map_1.fromColumnMap(columnRef[tableAlias]));
    }
    return result;
}
exports.fromColumnRef = fromColumnRef;
//# sourceMappingURL=from-column-ref.js.map