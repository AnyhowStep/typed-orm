"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../../query");
const sqlstring_1 = require("sqlstring");
const raw_expr_1 = require("../../../raw-expr");
function queryTree_Assignments(assignments) {
    if (assignments.length == 0) {
        throw new Error(`No assignments found`);
    }
    const result = [];
    for (let assignment of assignments) {
        if (result.length > 0) {
            result.push(",");
        }
        result.push(sqlstring_1.escapeId(assignment.tableAlias));
        result.push(".");
        result.push(sqlstring_1.escapeId(assignment.columnName));
        result.push("=");
        result.push(raw_expr_1.RawExprUtil.queryTree(assignment.value));
    }
    return result;
}
exports.queryTree_Assignments = queryTree_Assignments;
function queryTree(update) {
    const result = [];
    result.push("UPDATE");
    result.push(query_1.QueryUtil.queryTreeJoins(update._query));
    result.push(query_1.QueryUtil.queryTreeWhere(update._query));
    result.push("SET");
    result.push(queryTree_Assignments(update._assignments));
    return result;
}
exports.queryTree = queryTree;
//# sourceMappingURL=query-tree.js.map