"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expr_1 = require("../../expr");
const raw_expr_1 = require("../../../raw-expr");
function fromRawExpr(rawExpr) {
    if (rawExpr instanceof expr_1.Expr) {
        return rawExpr;
    }
    const usedColumns = raw_expr_1.RawExprUtil.usedColumns(rawExpr);
    const assertDelegate = raw_expr_1.RawExprUtil.assertDelegate(rawExpr);
    const queryTree = raw_expr_1.RawExprUtil.queryTree(rawExpr);
    return new expr_1.Expr({
        usedColumns,
        assertDelegate,
    }, queryTree);
}
exports.fromRawExpr = fromRawExpr;
//# sourceMappingURL=from-raw-expr.js.map