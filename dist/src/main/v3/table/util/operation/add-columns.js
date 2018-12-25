"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const add_columns_from_assert_map_1 = require("./add-columns-from-assert-map");
const add_columns_from_field_tuple_1 = require("./add-columns-from-field-tuple");
function addColumns(table, rawColumns) {
    if (rawColumns instanceof Array) {
        return add_columns_from_field_tuple_1.addColumnsFromFieldTuple(table, rawColumns);
    }
    else {
        return add_columns_from_assert_map_1.addColumnsFromAssertMap(table, rawColumns);
    }
}
exports.addColumns = addColumns;
//# sourceMappingURL=add-columns.js.map