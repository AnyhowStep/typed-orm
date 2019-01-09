"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_1 = require("../../../column");
function fromFieldArray(tableAlias, fields) {
    const result = {};
    for (let field of fields) {
        result[field.name] = new column_1.Column({
            tableAlias: tableAlias,
            name: field.name,
            assertDelegate: field.assertDelegate,
        });
    }
    return result;
}
exports.fromFieldArray = fromFieldArray;
//# sourceMappingURL=from-field-array.js.map