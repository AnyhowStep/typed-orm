"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const column_1 = require("../../../column");
function fromAssertMap(tableAlias, assertMap) {
    const result = {};
    for (let columnName in assertMap) {
        result[columnName] = new column_1.Column({
            tableAlias: tableAlias,
            name: columnName,
            assertDelegate: sd.toAssertDelegate(assertMap[columnName]),
        });
    }
    return result;
}
exports.fromAssertMap = fromAssertMap;
//# sourceMappingURL=from-assert-map.js.map