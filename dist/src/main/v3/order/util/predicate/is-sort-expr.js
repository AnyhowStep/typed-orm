"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_1 = require("../../../column");
const expr_1 = require("../../../expr");
function isSortExpr(raw) {
    return (column_1.ColumnUtil.isColumn(raw) ||
        expr_1.ExprUtil.isExpr(raw));
}
exports.isSortExpr = isSortExpr;
//# sourceMappingURL=is-sort-expr.js.map