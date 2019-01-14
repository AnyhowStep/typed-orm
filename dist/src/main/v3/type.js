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
/*
    Getters are a good way to pretend that a function is a read-only variable.
    They also help with resolving circular imports during run-time.
*/
function lazyInit(key, instantiate) {
    let value = undefined;
    const result = {
        get [key]() {
            if (value == undefined) {
                value = instantiate();
            }
            return value;
        }
    };
    return result;
}
exports.lazyInit = lazyInit;
//# sourceMappingURL=type.js.map