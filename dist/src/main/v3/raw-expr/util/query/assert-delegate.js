"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const expr_1 = require("../../../expr");
const column_1 = require("../../../column");
const query_1 = require("../../../query");
const dataType = require("../../../data-type");
const expr_select_item_1 = require("../../../expr-select-item");
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
        return sd.buffer();
    }
    if (rawExpr === null) {
        return sd.nil();
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
    throw new Error(`Unknown rawExpr ${sd.toTypeStr(rawExpr)}`);
}
exports.assertDelegate = assertDelegate;
//# sourceMappingURL=assert-delegate.js.map