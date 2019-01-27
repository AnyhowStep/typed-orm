"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const predicate_1 = require("../predicate");
const aliased_table_1 = require("../../../aliased-table");
const column_1 = require("../../../column");
const column_map_1 = require("../../../column-map");
const select_item_array_1 = require("../../../select-item-array");
const query_1 = require("../query");
const constants_1 = require("../../../constants");
function as(query, alias) {
    select_item_array_1.SelectItemArrayUtil.assertNoDuplicateColumnName(query._selects);
    const aliasedTable = new aliased_table_1.AliasedTable({
        usedColumns: (query._parentJoins == undefined ?
            [] :
            column_1.ColumnUtil.Array.fromJoinArray(query._parentJoins)),
        alias,
        columns: column_map_1.ColumnMapUtil.fromSelectItemArray(query._selects, alias),
    }, {
        unaliasedQuery: query_1.queryTree_As(query),
    });
    if (predicate_1.isOneSelectItemQuery(query) && predicate_1.isZeroOrOneRowQuery(query)) {
        //Should satisfy IAliasedTable and IExprSelectItem after this
        aliasedTable.assertDelegate = query_1.assertDelegate(query);
        aliasedTable.tableAlias = constants_1.ALIASED;
        return aliasedTable;
    }
    else {
        return aliasedTable;
    }
}
exports.as = as;
//# sourceMappingURL=as.js.map