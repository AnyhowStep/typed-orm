"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expr_1 = require("../../../expr");
const raw_expr_1 = require("../../../raw-expr");
const query_tree_1 = require("../../../query-tree");
const dataType = require("../../../data-type");
//https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#function_in
function In(left, arg0, ...args) {
    return new expr_1.Expr({
        usedColumns: raw_expr_1.RawExprUtil.Array.usedColumns([
            left,
            arg0,
            ...args,
        ]),
        assertDelegate: dataType.boolean(),
    }, [
        raw_expr_1.RawExprUtil.queryTree(left),
        new query_tree_1.FunctionCall("IN", [
            raw_expr_1.RawExprUtil.queryTree(arg0),
            ...args.map(raw_expr_1.RawExprUtil.queryTree),
        ]),
    ]);
}
exports.in = In;
//# sourceMappingURL=in.js.map