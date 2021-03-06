"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const predicate_1 = require("../predicate");
const aliased_table_1 = require("../../../aliased-table");
const column_ref_1 = require("../../../column-ref");
const column_map_1 = require("../../../column-map");
const select_item_array_1 = require("../../../select-item-array");
const query_1 = require("../query");
const constants_1 = require("../../../constants");
const order_1 = require("../../../order");
function as(query, alias) {
    select_item_array_1.SelectItemArrayUtil.assertNoDuplicateColumnName(query._selects);
    const aliasedTable = new aliased_table_1.AliasedTable({
        usedRef: (query._parentJoins == undefined ?
            {} :
            column_ref_1.ColumnRefUtil.fromJoinArray(query._parentJoins)),
        alias,
        columns: column_map_1.ColumnMapUtil.fromSelectItemArray(query._selects, alias),
    }, {
        unaliasedQuery: query_1.queryTree_As(query),
    });
    if (predicate_1.isOneSelectItemQuery(query) && predicate_1.isZeroOrOneRowQuery(query)) {
        //Should satisfy IAliasedTable and IExprSelectItem after this
        const d = query_1.assertDelegate(query);
        aliasedTable.assertDelegate = d;
        aliasedTable.tableAlias = constants_1.ALIASED;
        aliasedTable.asc = () => {
            return [
                {
                    usedRef: aliasedTable.usedRef,
                    assertDelegate: d,
                    queryTree: aliasedTable.unaliasedQuery,
                },
                order_1.ASC
            ];
        };
        aliasedTable.desc = () => {
            return [
                {
                    usedRef: aliasedTable.usedRef,
                    assertDelegate: d,
                    queryTree: aliasedTable.unaliasedQuery,
                },
                order_1.DESC
            ];
        };
        return aliasedTable;
    }
    else {
        return aliasedTable;
    }
}
exports.as = as;
//# sourceMappingURL=as.js.map