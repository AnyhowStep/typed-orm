"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_tree_1 = require("../../../query-tree");
const query_1 = require("../query");
async function execute(del, connection) {
    const sql = query_tree_1.QueryTreeUtil.toSql(query_1.queryTree(del));
    const result = await connection.delete(sql);
    return {
        ...result,
        deletedTableCount: del._tables.length,
    };
}
exports.execute = execute;
//# sourceMappingURL=execute.js.map