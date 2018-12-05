"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_map_1 = require("../../../column-map");
function fromColumnMap(columnMap) {
    return Object.keys(columnMap).map(columnName => columnMap[columnName]);
}
exports.fromColumnMap = fromColumnMap;
function fromJoin(join) {
    return fromColumnMap(column_map_1.ColumnMapUtil.fromJoin(join));
}
exports.fromJoin = fromJoin;
function fromJoinArray(joins) {
    const result = [];
    for (let join of joins) {
        result.push(...fromJoin(join));
    }
    return result;
}
exports.fromJoinArray = fromJoinArray;
//# sourceMappingURL=constructor.js.map