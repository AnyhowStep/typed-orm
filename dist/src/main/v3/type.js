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
function isStringArray(raw) {
    if (!(raw instanceof Array)) {
        return false;
    }
    for (let item of raw) {
        if (typeof item != "string") {
            return false;
        }
    }
    return true;
}
exports.isStringArray = isStringArray;
//# sourceMappingURL=type.js.map