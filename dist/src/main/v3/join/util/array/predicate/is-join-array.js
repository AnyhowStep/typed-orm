"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const predicate = require("../../predicate");
function isJoinArray(raw) {
    if (!(raw instanceof Array)) {
        return false;
    }
    for (let item of raw) {
        if (!predicate.isJoin(item)) {
            return false;
        }
    }
    return true;
}
exports.isJoinArray = isJoinArray;
//# sourceMappingURL=is-join-array.js.map