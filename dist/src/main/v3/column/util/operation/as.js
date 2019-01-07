"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_ref_1 = require("../../../column-ref");
const query_1 = require("../query");
function as(column, alias) {
    return {
        usedRef: column_ref_1.ColumnRefUtil.fromColumn(column),
        assertDelegate: column.assertDelegate,
        tableAlias: column.tableAlias,
        alias: alias,
        unaliasedQuery: query_1.queryTree(column),
    };
}
exports.as = as;
//# sourceMappingURL=as.js.map