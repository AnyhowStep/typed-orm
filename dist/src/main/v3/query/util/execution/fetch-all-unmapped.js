"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../query");
const query_tree_1 = require("../../../query-tree");
const constants_1 = require("../../../constants");
const select_item_array_1 = require("../../../select-item-array");
const column_ref_1 = require("../../../column-ref");
const data_type_1 = require("../../../data-type");
async function fetchAllUnmapped(query, connection) {
    select_item_array_1.SelectItemArrayUtil.assertNoDuplicateColumnName;
    const sql = query_tree_1.QueryTreeUtil.toSqlPretty(query_1.queryTree(query));
    const rawResult = await connection.select(sql);
    const hasDuplicateColumnName = select_item_array_1.SelectItemArrayUtil
        .hasDuplicateColumnName(query._selects);
    const ref = column_ref_1.ColumnRefUtil.fromQuerySelects(query);
    const rows = [];
    for (let rawRow of rawResult.rows) {
        const row = {};
        for (let k of Object.keys(rawRow)) {
            const parts = k.split(constants_1.SEPARATOR);
            const tableAlias = parts[0];
            const columnName = parts[1];
            switch (rawResult.fields[k].type) {
                case 12 /* DATETIME */:
                case 18 /* DATETIME2 */:
                case 7 /* TIMESTAMP */:
                case 17 /* TIMESTAMP2 */: {
                    rawRow[k] = data_type_1.DateTimeUtil.fromSqlUtc(rawRow[k], rawResult.fields[k].decimals);
                    break;
                }
            }
            const value = ref[tableAlias][columnName].assertDelegate(`${tableAlias}.${columnName}`, rawRow[k]);
            if (hasDuplicateColumnName) {
                let table = row[tableAlias];
                if (table == undefined) {
                    table = {};
                    row[tableAlias] = table;
                }
                table[columnName] = value;
            }
            else {
                row[columnName] = value;
            }
        }
        rows.push(row);
    }
    return rows;
}
exports.fetchAllUnmapped = fetchAllUnmapped;
//# sourceMappingURL=fetch-all-unmapped.js.map