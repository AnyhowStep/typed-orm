"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_tree_1 = require("../../../query-tree");
const query_1 = require("../query");
async function execute(del, connection) {
    const sql = query_tree_1.QueryTreeUtil.toSqlPretty(query_1.queryTree(del));
    const result = await connection.delete(sql);
    return result;
}
exports.execute = execute;
//# sourceMappingURL=execute.js.map