"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../order");
const column_1 = require("../../column");
const expr_1 = require("../../expr");
function isSort(raw) {
    return (raw === order_1.ASC ||
        raw === order_1.DESC);
}
exports.isSort = isSort;
function isOrderExpr(raw) {
    return (column_1.ColumnUtil.isColumn(raw) ||
        expr_1.ExprUtil.isExpr(raw));
}
exports.isOrderExpr = isOrderExpr;
function isOrder(raw) {
    if (!(raw instanceof Array)) {
        return false;
    }
    if (raw.length != 2) {
        return false;
    }
    if (!isSort(raw[1])) {
        return false;
    }
    if (!isOrderExpr(raw[0])) {
        return false;
    }
    return true;
}
exports.isOrder = isOrder;
//# sourceMappingURL=predicate.js.map