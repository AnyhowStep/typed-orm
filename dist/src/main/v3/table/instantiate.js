"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
const from_field_tuple_1 = require("./from-field-tuple");
const from_table_1 = require("./from-table");
function table(arg0, arg1) {
    if (arg1 == undefined) {
        return from_table_1.tableFromTable(arg0);
    }
    if (arg1 instanceof Array) {
        return from_field_tuple_1.tableFromFieldTuple(arg0, arg1);
    }
    else {
        return util_1.fromAssertMap(arg0, arg1);
    }
}
exports.table = table;
//# sourceMappingURL=instantiate.js.map