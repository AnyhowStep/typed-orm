"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expr_1 = require("../../../expr");
const raw_expr_1 = require("../../../raw-expr");
const query_tree_1 = require("../../../query-tree");
const dataType = require("../../../data-type");
//https://dev.mysql.com/doc/refman/8.0/en/mathematical-functions.html#function_ceil
function ceil(rawExpr) {
    const result = new expr_1.Expr({
        usedColumns: raw_expr_1.RawExprUtil.usedColumns(rawExpr),
        assertDelegate: dataType.bigint(),
    }, new query_tree_1.FunctionCall("CEIL", [
        raw_expr_1.RawExprUtil.queryTree(rawExpr)
    ]));
    return result;
}
exports.ceil = ceil;
//# sourceMappingURL=ceil.js.map