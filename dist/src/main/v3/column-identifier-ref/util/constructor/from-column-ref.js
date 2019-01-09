"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const from_column_map_1 = require("./from-column-map");
function appendColumnRef(ref, columnRef) {
    for (let tableAlias in columnRef) {
        from_column_map_1.appendColumnMap(ref, columnRef[tableAlias]);
    }
    return ref;
}
exports.appendColumnRef = appendColumnRef;
function fromColumnRef(columnRef) {
    const result = appendColumnRef({}, columnRef);
    return result;
}
exports.fromColumnRef = fromColumnRef;
//# sourceMappingURL=from-column-ref.js.map