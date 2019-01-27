"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const expr_1 = require("../../../expr");
const column_1 = require("../../../column");
const query_1 = require("../../../query");
const expr_select_item_1 = require("../../../expr-select-item");
function usedColumns(rawExpr) {
    //Check primitive cases first
    if (typeof rawExpr == "number") {
        return [];
    }
    if (typeof rawExpr == "bigint") {
        return [];
    }
    if (typeof rawExpr == "string") {
        return [];
    }
    if (typeof rawExpr == "boolean") {
        return [];
    }
    if (rawExpr instanceof Date) {
        return [];
    }
    if (rawExpr instanceof Buffer) {
        return [];
    }
    if (rawExpr === null) {
        return [];
    }
    if (expr_1.ExprUtil.isExpr(rawExpr)) {
        return rawExpr.usedColumns;
    }
    if (column_1.ColumnUtil.isColumn(rawExpr)) {
        return [rawExpr];
    }
    if (query_1.QueryUtil.isQuery(rawExpr)) {
        if (rawExpr._parentJoins == undefined) {
            return [];
        }
        else {
            return column_1.ColumnUtil.Array.fromJoinArray(rawExpr._parentJoins);
        }
    }
    if (expr_select_item_1.ExprSelectItemUtil.isExprSelectItem(rawExpr)) {
        return rawExpr.usedColumns;
    }
    throw new Error(`Unknown rawExpr ${sd.toTypeStr(rawExpr)}`);
}
exports.usedColumns = usedColumns;
//# sourceMappingURL=used-columns.js.map