"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../query");
const query_tree_1 = require("../../../query-tree");
const constants_1 = require("../../../constants");
const select_item_array_1 = require("../../../select-item-array");
const column_ref_1 = require("../../../column-ref");
async function fetchAll(query, connection) {
    select_item_array_1.SelectItemArrayUtil.assertNoDuplicateColumnName;
    const sql = query_tree_1.QueryTreeUtil.toSqlPretty(query_1.queryTree(query));
    const rawResult = await connection.select(sql);
    console.log("fetchAll result", rawResult);
    const hasDuplicateColumnName = select_item_array_1.SelectItemArrayUtil
        .hasDuplicateColumnName(query._selects);
    const ref = column_ref_1.ColumnRefUtil.fromQuerySelects(query);
    const rows = [];
    for (let rawRow of rawResult.rows) {
        const originalRow = {};
        for (let k of Object.keys(rawRow)) {
            const parts = rawRow[k].split(constants_1.SEPARATOR);
            const tableAlias = parts[0];
            const columnName = parts[1];
            const value = ref[tableAlias][columnName].assertDelegate(`${tableAlias}.${columnName}`, rawRow[k]);
            if (hasDuplicateColumnName) {
                let table = originalRow[tableAlias];
                if (table == undefined) {
                    table = {};
                    originalRow[tableAlias] = table;
                }
                table[columnName] = value;
            }
            else {
                originalRow[columnName] = value;
            }
        }
        const row = (query._mapDelegate == undefined) ?
            originalRow :
            await query._mapDelegate(originalRow, originalRow);
        rows.push(row);
    }
    return rows;
}
exports.fetchAll = fetchAll;
//# sourceMappingURL=fetch-all.js.map