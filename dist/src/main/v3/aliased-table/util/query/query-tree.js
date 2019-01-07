"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlstring_1 = require("sqlstring");
/*
    `name`
    `name` AS `alias`
    (SELECT x) AS `alias`
*/
function queryTree({ alias, unaliasedQuery, }) {
    const escapedAlias = sqlstring_1.escapeId(alias);
    if (unaliasedQuery === escapedAlias) {
        return unaliasedQuery;
    }
    return [
        unaliasedQuery,
        "AS",
        sqlstring_1.escapeId(alias),
    ];
}
exports.queryTree = queryTree;
//# sourceMappingURL=query-tree.js.map