"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function hasOneTable(columnRef) {
    return (Object.keys(columnRef).length == 1);
}
exports.hasOneTable = hasOneTable;
function toConvenient(columnRef) {
    const keys = Object.keys(columnRef);
    if (keys.length == 1) {
        const result = columnRef[keys[0]];
        return result;
    }
    else {
        return columnRef;
    }
}
exports.toConvenient = toConvenient;
//# sourceMappingURL=operation.js.map