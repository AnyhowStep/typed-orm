"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expr_1 = require("../../../expr");
const raw_expr_1 = require("../../../raw-expr");
const query_tree_1 = require("../../../query-tree");
const dataType = require("../../../data-type");
const query_1 = require("../../../query");
const column_ref_1 = require("../../../column-ref");
//https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#function_in
function inSubQuery(left, right) {
    return new expr_1.Expr({
        usedRef: column_ref_1.ColumnRefUtil.intersectTuple(raw_expr_1.RawExprUtil.usedRef(left), column_ref_1.ColumnRefUtil.fromQueryJoins(right)),
        assertDelegate: dataType.boolean(),
    }, [
        raw_expr_1.RawExprUtil.queryTree(left),
        new query_tree_1.FunctionCall("IN", [
            query_1.QueryUtil.queryTree_RawExpr(right)
        ]),
    ]);
}
//https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#function_in
function inList(left, arg0, ...args) {
    return new expr_1.Expr({
        usedRef: raw_expr_1.RawExprUtil.intersectUsedRefTuple(left, arg0, ...args),
        assertDelegate: dataType.boolean(),
    }, [
        raw_expr_1.RawExprUtil.queryTree(left),
        new query_tree_1.FunctionCall("IN", [
            raw_expr_1.RawExprUtil.queryTree(arg0),
            ...args.map(raw_expr_1.RawExprUtil.queryTree),
        ]),
    ]);
}
function In(left, arg0, ...args) {
    if (args.length == 0 &&
        query_1.QueryUtil.isQuery(arg0) &&
        query_1.QueryUtil.isOneSelectItemQuery(arg0)) {
        return inSubQuery(left, arg0);
    }
    else {
        return inList(left, arg0, ...args);
    }
}
exports.in = In;
//# sourceMappingURL=in.js.map