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
//# sourceMappingURL=predicate.js.map