"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isObjectWithKeys(raw, keys) {
    if (raw == undefined) {
        return false;
    }
    if (!(raw instanceof Object)) {
        return false;
    }
    for (let k of keys) {
        if (!(k in raw)) {
            return false;
        }
    }
    return true;
}
exports.isObjectWithKeys = isObjectWithKeys;
exports.MAX_SAFE_INTEGER = 9007199254740991;
//# sourceMappingURL=type.js.map