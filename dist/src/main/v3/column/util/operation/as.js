"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../query");
function as(column, alias) {
    return {
        usedColumns: [column],
        assertDelegate: column.assertDelegate,
        tableAlias: column.tableAlias,
        alias: alias,
        unaliasedQuery: query_1.queryTree(column),
    };
}
exports.as = as;
//# sourceMappingURL=as.js.map