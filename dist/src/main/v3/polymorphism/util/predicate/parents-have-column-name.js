"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parentsHaveColumnName(table, columnName) {
    for (let p of table.parents) {
        if (columnName in p.columns) {
            return true;
        }
    }
    return false;
}
exports.parentsHaveColumnName = parentsHaveColumnName;
//# sourceMappingURL=parents-have-column-name.js.map