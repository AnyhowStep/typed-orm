"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const expr_1 = require("../../../expr");
const column_1 = require("../../../column");
const sqlstring_1 = require("sqlstring");
const query_1 = require("../../../query");
const data_type_1 = require("../../../data-type");
const expr_select_item_1 = require("../../../expr-select-item");
const query_tree_1 = require("../../../query-tree");
function queryTree(rawExpr) {
    //Check primitive cases first
    if (typeof rawExpr == "number") {
        //This technically gives us DECIMAL in MySQL,
        //Not double
        return rawExpr.toString();
    }
    if (typeof rawExpr == "bigint") {
        return rawExpr.toString();
    }
    if (typeof rawExpr == "string") {
        return sqlstring_1.escape(rawExpr);
    }
    if (typeof rawExpr == "boolean") {
        return sqlstring_1.escape(rawExpr);
    }
    if (rawExpr instanceof Date) {
        return data_type_1.DateTimeUtil.toSqlUtc(rawExpr, 3);
    }
    if (rawExpr instanceof Buffer) {
        //escape(Buffer.from("hello")) == "X'68656c6c6f'"
        return sqlstring_1.escape(rawExpr);
    }
    if (rawExpr === null) {
        return sqlstring_1.escape(rawExpr);
    }
    if (expr_1.ExprUtil.isExpr(rawExpr)) {
        return rawExpr.queryTree;
    }
    if (column_1.ColumnUtil.isColumn(rawExpr)) {
        return column_1.ColumnUtil.queryTree(rawExpr);
    }
    if (query_1.QueryUtil.isQuery(rawExpr) && query_1.QueryUtil.isOneSelectItemQuery(rawExpr)) {
        return query_1.QueryUtil.queryTree_RawExpr(rawExpr);
    }
    if (expr_select_item_1.ExprSelectItemUtil.isExprSelectItem(rawExpr)) {
        return query_tree_1.Parentheses.Create(rawExpr.unaliasedQuery);
    }
    throw new Error(`Unknown rawExpr ${sd.toTypeStr(rawExpr)}`);
}
exports.queryTree = queryTree;
//# sourceMappingURL=query-tree.js.map