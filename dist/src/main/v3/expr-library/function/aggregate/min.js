"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const expr_1 = require("../../../expr");
const raw_expr_1 = require("../../../raw-expr");
const query_tree_1 = require("../../../query-tree");
//https://dev.mysql.com/doc/refman/8.0/en/group-by-functions.html#function_min
function min(rawExpr) {
    const result = new expr_1.Expr({
        usedColumns: raw_expr_1.RawExprUtil.usedColumns(rawExpr),
        assertDelegate: sd.nullable(raw_expr_1.RawExprUtil.assertDelegate(rawExpr)),
    }, new query_tree_1.FunctionCall("MIN", [
        raw_expr_1.RawExprUtil.queryTree(rawExpr)
    ]));
    return result;
}
exports.min = min;
//# sourceMappingURL=min.js.map