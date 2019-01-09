"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const predicate_1 = require("../../predicate");
function hasColumnIdentifier(arr, columnIdentifier) {
    for (let item of arr) {
        if (predicate_1.isEqual(item, columnIdentifier)) {
            return true;
        }
    }
    return false;
}
exports.hasColumnIdentifier = hasColumnIdentifier;
//# sourceMappingURL=has-column-identifier.js.map