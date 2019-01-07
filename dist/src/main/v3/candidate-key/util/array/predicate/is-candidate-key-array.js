"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const predicate_1 = require("../../predicate");
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
//# sourceMappingURL=is-candidate-key-array.js.map