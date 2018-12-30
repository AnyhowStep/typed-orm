"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isMutable(table, name) {
    if ((name in table.columns) &&
        table.mutable.indexOf(name) < 0) {
        return false;
    }
    for (let p of table.parents) {
        if ((name in p.columns) &&
            //TODO-DEBATE Consider naming it isMutable?
            //TODO-DEBATE or renaming isNullable to nullable?
            p.mutable.indexOf(name) < 0) {
            return false;
        }
    }
    return true;
}
exports.isMutable = isMutable;
//# sourceMappingURL=is-mutable.js.map