"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const expr_1 = require("../../../expr");
const raw_expr_1 = require("../../../raw-expr");
const query_tree_1 = require("../../../query-tree");
//https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#function_not-in
function notIn(left, arg0, ...args) {
    return new expr_1.Expr({
        usedRef: raw_expr_1.RawExprUtil.intersectUsedRefTuple(left, arg0, ...args),
        assertDelegate: sd.numberToBoolean(),
    }, [
        raw_expr_1.RawExprUtil.queryTree(left),
        new query_tree_1.FunctionCall("NOT IN", [
            raw_expr_1.RawExprUtil.queryTree(arg0),
            ...args.map(raw_expr_1.RawExprUtil.queryTree),
        ]),
    ]);
}
exports.notIn = notIn;
//# sourceMappingURL=not-in.js.map