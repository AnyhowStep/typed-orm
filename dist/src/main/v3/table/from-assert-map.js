"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("./table");
const column_map_1 = require("../column-map");
const assert_map_1 = require("../assert-map");
const mysql_1 = require("mysql");
function tableFromAssertMap(name, assertMap) {
    /*
        In general, this should be fine.
        Could be wrong if user does some weird hack-ery.
    */
    const columnNames = Object.keys(assertMap);
    const columns = column_map_1.ColumnMapUtil.fromAssertMap(name, assertMap);
    const isNullable = assert_map_1.AssertMapUtil.nullableNames(assertMap);
    const mutable = columnNames;
    return new table_1.Table({
        usedRef: {},
        alias: name,
        name: name,
        columns,
        autoIncrement: undefined,
        id: undefined,
        candidateKeys: [],
        generated: [],
        isNullable,
        hasExplicitDefaultValue: [],
        mutable,
        parents: [],
        insertAllowed: true,
        deleteAllowed: true,
    }, {
        unaliasedQuery: mysql_1.escapeId(name),
    });
}
exports.tableFromAssertMap = tableFromAssertMap;
//# sourceMappingURL=from-assert-map.js.map