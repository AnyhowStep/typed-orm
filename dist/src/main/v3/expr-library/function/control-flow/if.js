"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const expr_1 = require("../../../expr");
const raw_expr_1 = require("../../../raw-expr");
const query_tree_1 = require("../../../query-tree");
//https://dev.mysql.com/doc/refman/8.0/en/control-flow-functions.html#function_if
function If(condition, thenExpr, elseExpr) {
    const result = new expr_1.Expr({
        usedColumns: raw_expr_1.RawExprUtil.Array.usedColumns([
            condition,
            thenExpr,
            elseExpr,
        ]),
        assertDelegate: sd.or(raw_expr_1.RawExprUtil.assertDelegate(thenExpr), raw_expr_1.RawExprUtil.assertDelegate(elseExpr)),
    }, new query_tree_1.FunctionCall("IF", [
        raw_expr_1.RawExprUtil.queryTree(condition),
        raw_expr_1.RawExprUtil.queryTree(thenExpr),
        raw_expr_1.RawExprUtil.queryTree(elseExpr),
    ]));
    return result;
}
exports.if = If;
//# sourceMappingURL=if.js.map