"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isCandidateKey(raw) {
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
exports.isCandidateKey = isCandidateKey;
//# sourceMappingURL=is-candidate-key.js.map