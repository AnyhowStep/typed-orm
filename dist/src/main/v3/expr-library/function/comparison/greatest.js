"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("type-mapping");
const expr_1 = require("../../../expr");
const raw_expr_1 = require("../../../raw-expr");
const query_tree_1 = require("../../../query-tree");
//https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#function_greatest
function greatest(arg0, arg1, ...args) {
    return new expr_1.Expr({
        usedRef: raw_expr_1.RawExprUtil.intersectUsedRefTuple(arg0, arg1, ...args),
        assertDelegate: sd.or(raw_expr_1.RawExprUtil.assertDelegate(arg0), raw_expr_1.RawExprUtil.assertDelegate(arg1), ...args.map(raw_expr_1.RawExprUtil.assertDelegate)),
    }, new query_tree_1.FunctionCall("GREATEST", [
        raw_expr_1.RawExprUtil.queryTree(arg0),
        raw_expr_1.RawExprUtil.queryTree(arg1),
        ...args.map(raw_expr_1.RawExprUtil.queryTree),
    ]));
}
exports.greatest = greatest;
//# sourceMappingURL=greatest.js.map