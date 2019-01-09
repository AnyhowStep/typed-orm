"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const from_column_map_1 = require("./from-column-map");
function appendJoin(ref, join) {
    from_column_map_1.appendColumnMap(ref, join.columns);
    return ref;
}
exports.appendJoin = appendJoin;
function appendJoinArray(ref, arr) {
    for (let join of arr) {
        appendJoin(ref, join);
    }
    return ref;
}
exports.appendJoinArray = appendJoinArray;
function fromJoinArray(arr) {
    const result = {};
    appendJoinArray(result, arr);
    return result;
}
exports.fromJoinArray = fromJoinArray;
//# sourceMappingURL=from-join-array.js.map