"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parents_have_column_name_1 = require("./parents-have-column-name");
function isNullable(table, name) {
    if (parents_have_column_name_1.parentsHaveColumnName(table, name)) {
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
    else {
        return (table.isNullable.indexOf(name) >= 0);
    }
}
exports.isNullable = isNullable;
//# sourceMappingURL=is-nullable.js.map