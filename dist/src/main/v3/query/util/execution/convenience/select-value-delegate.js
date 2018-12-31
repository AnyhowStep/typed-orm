"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expr_1 = require("../../../../expr");
const column_1 = require("../../../../column");
const expr_select_item_1 = require("../../../../expr-select-item");
function executeSelectValueDelegate(columns, query, delegate) {
    const rawExpr = delegate(columns, query);
    const selectItem = (column_1.ColumnUtil.isColumn(rawExpr) ?
        rawExpr :
        expr_select_item_1.ExprSelectItemUtil.isExprSelectItem(rawExpr) ?
            rawExpr :
            expr_1.ExprUtil.as(expr_1.ExprUtil.fromRawExpr(rawExpr), "value"));
    return [selectItem];
}
exports.executeSelectValueDelegate = executeSelectValueDelegate;
//# sourceMappingURL=select-value-delegate.js.map