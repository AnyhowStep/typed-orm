"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isKey(raw) {
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
exports.isKey = isKey;
//# sourceMappingURL=is-key.js.map