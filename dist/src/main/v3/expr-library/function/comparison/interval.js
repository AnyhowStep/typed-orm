"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expr_1 = require("../../../expr");
const raw_expr_1 = require("../../../raw-expr");
const query_tree_1 = require("../../../query-tree");
const dataType = require("../../../data-type");
//https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#function_interval
function interval(arg0, arg1, ...args) {
    return new expr_1.Expr({
        usedColumns: raw_expr_1.RawExprUtil.Array.usedColumns([
            arg0,
            arg1,
            ...args,
        ]),
        assertDelegate: dataType.bigint(),
    }, new query_tree_1.FunctionCall("INTERVAL", [
        raw_expr_1.RawExprUtil.queryTree(arg0),
        raw_expr_1.RawExprUtil.queryTree(arg1),
        ...args.map(raw_expr_1.RawExprUtil.queryTree),
    ]));
}
exports.interval = interval;
//# sourceMappingURL=interval.js.map