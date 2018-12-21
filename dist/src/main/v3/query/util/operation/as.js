"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aliased_table_1 = require("../../../aliased-table");
const column_ref_1 = require("../../../column-ref");
const column_map_1 = require("../../../column-map");
const select_item_array_1 = require("../../../select-item-array");
const query_1 = require("../query");
function as(query, alias) {
    select_item_array_1.SelectItemArrayUtil.assertNoDuplicateColumnName(query._selects);
    return new aliased_table_1.AliasedTable({
        usedRef: (query._parentJoins == undefined ?
            {} :
            column_ref_1.ColumnRefUtil.fromJoinArray(query._parentJoins)),
        alias,
        columns: column_map_1.ColumnMapUtil.fromSelectItemArray(query._selects, alias),
    }, {
        unaliasedQuery: query_1.queryTree_As(query),
    });
}
exports.as = as;
//# sourceMappingURL=as.js.map