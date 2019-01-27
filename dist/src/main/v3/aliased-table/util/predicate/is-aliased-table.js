"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_map_1 = require("../../../column-map");
const column_1 = require("../../../column");
const query_tree_1 = require("../../../query-tree");
function isAliasedTable(raw) {
    return (raw != undefined &&
        (raw instanceof Object) &&
        ("usedColumns" in raw) &&
        ("alias" in raw) &&
        ("columns" in raw) &&
        ("unaliasedQuery" in raw) &&
        column_1.ColumnUtil.Array.isColumnArray(raw.usedColumns) &&
        (typeof raw.alias == "string") &&
        column_map_1.ColumnMapUtil.isColumnMap(raw.columns) &&
        query_tree_1.QueryTreeUtil.isQueryTree(raw.unaliasedQuery));
}
exports.isAliasedTable = isAliasedTable;
//# sourceMappingURL=is-aliased-table.js.map