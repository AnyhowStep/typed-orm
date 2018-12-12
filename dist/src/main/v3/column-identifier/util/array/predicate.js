"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const predicate_1 = require("../predicate");
function isColumnIdentifierArray(raw) {
    if (!(raw instanceof Array)) {
        return false;
    }
    for (let item of raw) {
        if (!predicate_1.isColumnIdentifier(item)) {
            return false;
        }
    }
    return true;
}
exports.isColumnIdentifierArray = isColumnIdentifierArray;
function hasColumnIdentifier(arr, columnIdentifier) {
    for (let item of arr) {
        if (predicate_1.isEqual(item, columnIdentifier)) {
            return true;
        }
    }
    return false;
}
exports.hasColumnIdentifier = hasColumnIdentifier;
function assertNoOverlap(arrA, arrB) {
    for (let a of arrA) {
        for (let b of arrB) {
            if (predicate_1.isEqual(a, b)) {
                throw new Error(`Duplicate column identifier ${a.tableAlias}.${a.name} found; consider aliasing`);
            }
        }
    }
}
exports.assertNoOverlap = assertNoOverlap;
function assertNoDuplicate(arr) {
    for (let i = 0; i < arr.length; ++i) {
        for (let j = i + 1; j < arr.length; ++j) {
            if (predicate_1.isEqual(arr[i], arr[j])) {
                throw new Error(`Duplicate column identifier ${arr[i].tableAlias}.${arr[i].name}`);
            }
        }
    }
}
exports.assertNoDuplicate = assertNoDuplicate;
//# sourceMappingURL=predicate.js.map