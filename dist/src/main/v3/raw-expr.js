"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("type-mapping");
const expr_1 = require("./expr");
const column_1 = require("./column");
const column_ref_1 = require("./column-ref");
const sqlstring_1 = require("sqlstring");
const query_1 = require("./query");
const data_type_1 = require("./data-type");
const dataType = require("./data-type");
const expr_select_item_1 = require("./expr-select-item");
const query_tree_1 = require("./query-tree");
var RawExprUtil;
(function (RawExprUtil) {
    function usedRef(rawExpr) {
        //Check primitive cases first
        if (typeof rawExpr == "number") {
            return {};
        }
        if (typeof rawExpr == "bigint") {
            return {};
        }
        if (typeof rawExpr == "string") {
            return {};
        }
        if (typeof rawExpr == "boolean") {
            return {};
        }
        if (rawExpr instanceof Date) {
            return {};
        }
        if (rawExpr instanceof Buffer) {
            return {};
        }
        if (rawExpr === null) {
            return {};
        }
        if (expr_1.ExprUtil.isExpr(rawExpr)) {
            return rawExpr.usedRef;
        }
        if (column_1.ColumnUtil.isColumn(rawExpr)) {
            return column_ref_1.ColumnRefUtil.fromColumn(rawExpr);
        }
        if (query_1.QueryUtil.isQuery(rawExpr)) {
            if (rawExpr._parentJoins == undefined) {
                return {};
            }
            else {
                return column_ref_1.ColumnRefUtil.fromJoinArray(rawExpr._parentJoins);
            }
        }
        if (expr_select_item_1.ExprSelectItemUtil.isExprSelectItem(rawExpr)) {
            return rawExpr.usedRef;
        }
        throw new Error(`Unknown rawExpr ${sd.TypeUtil.toTypeStr(rawExpr)}`);
    }
    RawExprUtil.usedRef = usedRef;
    function assertDelegate(rawExpr) {
        //Check primitive cases first
        if (typeof rawExpr == "number") {
            return dataType.double();
        }
        if (typeof rawExpr == "bigint") {
            return dataType.bigint();
        }
        if (typeof rawExpr == "string") {
            return sd.literal(rawExpr);
        }
        if (typeof rawExpr == "boolean") {
            return (rawExpr ?
                dataType.true() :
                dataType.false());
        }
        if (rawExpr instanceof Date) {
            return dataType.dateTime(3);
        }
        if (rawExpr instanceof Buffer) {
            return sd.instanceOfBuffer();
        }
        if (rawExpr === null) {
            return sd.null();
        }
        if (expr_1.ExprUtil.isExpr(rawExpr)) {
            return rawExpr.assertDelegate;
        }
        if (column_1.ColumnUtil.isColumn(rawExpr)) {
            return rawExpr.assertDelegate;
        }
        if (query_1.QueryUtil.isQuery(rawExpr) &&
            query_1.QueryUtil.isOneSelectItemQuery(rawExpr) &&
            query_1.QueryUtil.isZeroOrOneRowQuery(rawExpr)) {
            return query_1.QueryUtil.assertDelegate(rawExpr);
        }
        if (expr_select_item_1.ExprSelectItemUtil.isExprSelectItem(rawExpr)) {
            return rawExpr.assertDelegate;
        }
        throw new Error(`Unknown rawExpr ${sd.TypeUtil.toTypeStr(rawExpr)}`);
    }
    RawExprUtil.assertDelegate = assertDelegate;
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
            return query_tree_1.Parentheses.Create(rawExpr.unaliasedQuery, false /*canUnwrap*/);
        }
        throw new Error(`Unknown rawExpr ${sd.TypeUtil.toTypeStr(rawExpr)}`);
    }
    RawExprUtil.queryTree = queryTree;
    function intersectUsedRefTuple(...arr) {
        return column_ref_1.ColumnRefUtil.intersectTuple(...arr.map(usedRef));
    }
    RawExprUtil.intersectUsedRefTuple = intersectUsedRefTuple;
})(RawExprUtil = exports.RawExprUtil || (exports.RawExprUtil = {}));
//# sourceMappingURL=raw-expr.js.map