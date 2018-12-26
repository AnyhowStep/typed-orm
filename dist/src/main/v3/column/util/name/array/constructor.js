"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
function fromColumnMap(columnMap) {
    //Technically, this could be wrong.
    //But it shouldn't be wrong, in general.
    return Object.keys(columnMap);
}
exports.fromColumnMap = fromColumnMap;
function fromColumnRef(columnRef) {
    const result = Object.keys(columnRef).reduce((memo, tableAlias) => {
        memo.push(...fromColumnMap(columnRef[tableAlias]));
        return memo;
    }, []);
    return result;
}
exports.fromColumnRef = fromColumnRef;
function nullableFromColumnMap(columnMap) {
    return Object.keys(columnMap)
        .filter(columnName => sd.isNullable(columnMap[columnName].assertDelegate));
}
exports.nullableFromColumnMap = nullableFromColumnMap;
//# sourceMappingURL=constructor.js.map