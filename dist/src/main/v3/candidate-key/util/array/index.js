"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./operation"));
__export(require("./predicate"));
const predicate_1 = require("../predicate");
function hasSubKey(arr, key) {
    for (let k of arr) {
        if (predicate_1.isSubKey(k, key)) {
            return true;
        }
    }
    return false;
}
exports.hasSubKey = hasSubKey;
function hasSuperKey(arr, key) {
    for (let k of arr) {
        if (predicate_1.isSubKey(key, k)) {
            return true;
        }
    }
    return false;
}
exports.hasSuperKey = hasSuperKey;
function hasKey(arr, key) {
    for (let k of arr) {
        if (predicate_1.isEqual(k, key)) {
            return true;
        }
    }
    return false;
}
exports.hasKey = hasKey;
function isCandidateKeyArray(raw) {
    if (!(raw instanceof Array)) {
        return false;
    }
    for (let item of raw) {
        if (!predicate_1.isCandidateKey(item)) {
            return false;
        }
    }
    return true;
}
exports.isCandidateKeyArray = isCandidateKeyArray;
//# sourceMappingURL=index.js.map