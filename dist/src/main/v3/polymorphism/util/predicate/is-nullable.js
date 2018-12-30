"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isNullable(table, name) {
    if ((name in table.columns) &&
        table.isNullable.indexOf(name) < 0) {
        return false;
    }
    for (let p of table.parents) {
        if ((name in p.columns) &&
            //TODO-DEBATE Consider using Set<string> instead
            //of string[] ?
            p.isNullable.indexOf(name) < 0) {
            return false;
        }
    }
    return true;
}
exports.isNullable = isNullable;
//# sourceMappingURL=is-nullable.js.map