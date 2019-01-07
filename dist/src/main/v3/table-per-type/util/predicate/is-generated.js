"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isGenerated(table, name) {
    if (table.generated.indexOf(name) >= 0) {
        return true;
    }
    for (let p of table.parents) {
        if (p.generated.indexOf(name) >= 0) {
            return true;
        }
    }
    return false;
}
exports.isGenerated = isGenerated;
//# sourceMappingURL=is-generated.js.map