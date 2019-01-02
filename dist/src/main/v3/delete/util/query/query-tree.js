"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const delete_1 = require("../../delete");
const query_1 = require("../../../query");
function queryTree_Tables(tables) {
    const result = [];
    for (let table of tables) {
        if (result.length > 0) {
            result.push(",");
        }
        if (!table.deleteAllowed) {
            throw new Error(`Cannot delete from table ${table.alias}; explicitly not allowed`);
        }
        result.push(table.unaliasedQuery);
    }
    if (result.length == 0) {
        throw new Error(`No tables found`);
    }
    return result;
}
exports.queryTree_Tables = queryTree_Tables;
function queryTree(del) {
    const result = [];
    result.push("DELETE");
    if (del._modifier == delete_1.DeleteModifier.IGNORE) {
        result.push("IGNORE");
    }
    result.push(queryTree_Tables(del._tables));
    result.push(query_1.QueryUtil.queryTreeFrom(del._query));
    result.push(query_1.QueryUtil.queryTreeWhere(del._query));
    return result;
}
exports.queryTree = queryTree;
//# sourceMappingURL=query-tree.js.map