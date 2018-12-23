"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const expr_1 = require("./expr");
const column_1 = require("./column");
const table_subquery_1 = require("./table-subquery");
const column_ref_1 = require("./column-ref");
const sqlstring_1 = require("sqlstring");
const query_1 = require("./query");
const data_type_1 = require("./data-type");
const dataType = require("./data-type");
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
        if (rawExpr instanceof data_type_1.MySqlDateTime) {
            return {};
        }
        if (rawExpr instanceof data_type_1.MySqlDate) {
            return {};
        }
        if (rawExpr instanceof data_type_1.MySqlTime) {
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
        if (table_subquery_1.TableSubquery.isSingleValueOrEmpty(rawExpr)) {
            return {};
        }
        throw new Error(`Unknown rawExpr ${sd.toTypeStr(rawExpr)}`);
    }
    RawExprUtil.usedRef = usedRef;
    function assertDelegate(rawExpr) {
        //Check primitive cases first
        if (typeof rawExpr == "number") {
            return sd.literal(rawExpr);
        }
        if (typeof rawExpr == "bigint") {
            return dataType.bigint;
        }
        if (typeof rawExpr == "string") {
            return sd.literal(rawExpr);
        }
        if (typeof rawExpr == "boolean") {
            //MySQL returns `number` instead of `boolean`
            return (rawExpr ?
                sd.numberToTrue() :
                sd.numberToFalse());
        }
        if (rawExpr instanceof Date) {
            //TODO Have a delegate that checks for the exact date given?
            return sd.date();
        }
        if (rawExpr instanceof Buffer) {
            //TODO Have a delegate that checks for the exact buffer given?
            //May not be desirable if the buffer is large...
            return sd.buffer();
        }
        if (rawExpr === null) {
            return sd.nil();
        }
        if (rawExpr instanceof data_type_1.MySqlDateTime) {
            return data_type_1.dateTime;
        }
        if (rawExpr instanceof data_type_1.MySqlDate) {
            return data_type_1.date;
        }
        if (rawExpr instanceof data_type_1.MySqlTime) {
            return data_type_1.time;
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
        if (table_subquery_1.TableSubquery.isSingleValueOrEmpty(rawExpr)) {
            return table_subquery_1.TableSubquery.assertDelegate(rawExpr);
        }
        throw new Error(`Unknown rawExpr ${sd.toTypeStr(rawExpr)}`);
    }
    RawExprUtil.assertDelegate = assertDelegate;
    function zeroPad(num, length) {
        const str = num.toString();
        if (str.length < length) {
            return "0".repeat(length - str.length) + str;
        }
        else {
            return str;
        }
    }
    function queryTree(rawExpr) {
        //Check primitive cases first
        if (typeof rawExpr == "number") {
            return sqlstring_1.escape(rawExpr);
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
            const year = zeroPad(rawExpr.getUTCFullYear(), 4);
            const month = zeroPad(rawExpr.getUTCMonth() + 1, 2);
            const day = zeroPad(rawExpr.getUTCDate(), 2);
            const hour = zeroPad(rawExpr.getUTCHours(), 2);
            const minute = zeroPad(rawExpr.getUTCMinutes(), 2);
            const second = zeroPad(rawExpr.getUTCSeconds(), 2);
            const ms = zeroPad(rawExpr.getMilliseconds(), 3);
            return sqlstring_1.escape(`${year}-${month}-${day} ${hour}:${minute}:${second}.${ms}`);
        }
        if (rawExpr instanceof Buffer) {
            //escape(Buffer.from("hello")) == "X'68656c6c6f'"
            return sqlstring_1.escape(rawExpr);
        }
        if (rawExpr === null) {
            return sqlstring_1.escape(rawExpr);
        }
        if (rawExpr instanceof data_type_1.MySqlDateTime) {
            return sqlstring_1.escape(rawExpr.mySqlString());
        }
        if (rawExpr instanceof data_type_1.MySqlDate) {
            return sqlstring_1.escape(rawExpr.mySqlString());
        }
        if (rawExpr instanceof data_type_1.MySqlTime) {
            return sqlstring_1.escape(rawExpr.mySqlString());
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
        if (table_subquery_1.TableSubquery.isSingleValueOrEmpty(rawExpr)) {
            return table_subquery_1.TableSubquery.queryTree(rawExpr);
        }
        throw new Error(`Unknown rawExpr ${sd.toTypeStr(rawExpr)}`);
    }
    RawExprUtil.queryTree = queryTree;
    function intersectUsedRefTuple(...arr) {
        return column_ref_1.ColumnRefUtil.intersectTuple(...arr.map(usedRef));
    }
    RawExprUtil.intersectUsedRefTuple = intersectUsedRefTuple;
})(RawExprUtil = exports.RawExprUtil || (exports.RawExprUtil = {}));
//# sourceMappingURL=raw-expr.js.map