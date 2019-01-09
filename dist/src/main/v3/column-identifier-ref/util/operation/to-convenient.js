"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=to-convenient.js.map