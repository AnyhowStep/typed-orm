"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_tree_1 = require("./query-tree");
const query_tree_2 = require("../../../query-tree");
function printSql(insert) {
    const sql = query_tree_2.QueryTreeUtil.toSql(query_tree_1.queryTree(insert));
    console.log(sql);
}
exports.printSql = printSql;
//# sourceMappingURL=print-sql.js.map