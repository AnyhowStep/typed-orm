"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const column_names_1 = require("./column-names");
const get_columns_with_name_1 = require("./get-columns-with-name");
function assertDelegate(table) {
    const assertMap = {};
    for (let columnName of column_names_1.uniqueColumnNames(table)) {
        const columns = get_columns_with_name_1.getColumnsWithName(table, columnName);
        if (columns.length == 0) {
            throw new Error(`No columns found for ${table.alias}.${columnName}`);
        }
        assertMap[columnName] = sd.and(...columns.map(c => c.assertDelegate));
    }
    return sd.toSchema(assertMap);
}
exports.assertDelegate = assertDelegate;
//# sourceMappingURL=type-map.js.map