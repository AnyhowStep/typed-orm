"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_tree_1 = require("../../../query-tree");
const query_1 = require("../query");
async function execute(update, connection) {
    if (update._assignments.length == 0) {
        return {
            fieldCount: -1,
            affectedRows: -1,
            insertId: 0,
            serverStatus: -1,
            warningCount: -1,
            message: "No SET clause, did not execute",
            protocol41: true,
            changedRows: 0,
            //Alias for affectedRows
            foundRowCount: -1,
            //Alias for changedRows
            updatedRowCount: 0,
        };
    }
    const sql = query_tree_1.QueryTreeUtil.toSqlPretty(query_1.queryTree(update));
    const result = await connection.update(sql);
    return result;
}
exports.execute = execute;
//# sourceMappingURL=execute.js.map