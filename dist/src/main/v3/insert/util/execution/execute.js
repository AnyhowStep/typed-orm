"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_tree_1 = require("../../../query-tree");
const query_1 = require("../query");
function execute(insert, connection) {
    const sql = query_tree_1.QueryTreeUtil.toSqlPretty(query_1.queryTree(insert));
    return connection.insert(sql);
}
exports.execute = execute;
//# sourceMappingURL=execute.js.map