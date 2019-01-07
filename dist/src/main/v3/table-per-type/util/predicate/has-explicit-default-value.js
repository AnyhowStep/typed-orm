"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parents_have_column_name_1 = require("./parents-have-column-name");
function hasExplicitDefaultValue(table, name) {
    if (parents_have_column_name_1.parentsHaveColumnName(table, name)) {
        for (let p of table.parents) {
            if ((name in p.columns) &&
                p.hasExplicitDefaultValue.indexOf(name) < 0) {
                return false;
            }
        }
        return true;
    }
    else {
        return (table.hasExplicitDefaultValue.indexOf(name) >= 0);
    }
}
exports.hasExplicitDefaultValue = hasExplicitDefaultValue;
//# sourceMappingURL=has-explicit-default-value.js.map