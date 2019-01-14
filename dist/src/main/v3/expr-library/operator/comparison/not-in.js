"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expr_1 = require("../../../expr");
const raw_expr_1 = require("../../../raw-expr");
const primitive_expr_1 = require("../../../primitive-expr");
const query_tree_1 = require("../../../query-tree");
const dataType = require("../../../data-type");
//value IN (/*Empty list*/) should be `false`
//value NOT IN (/*Empty list*/) should be `true`
//https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#function_not-in
function notInPrimitiveList(left, ...args) {
    if (args.length == 0) {
        return new expr_1.Expr({
            usedRef: raw_expr_1.RawExprUtil.usedRef(left),
            assertDelegate: dataType.boolean(),
        }, raw_expr_1.RawExprUtil.queryTree(true));
    }
    else {
        return new expr_1.Expr({
            usedRef: raw_expr_1.RawExprUtil.usedRef(left),
            assertDelegate: dataType.boolean(),
        }, [
            raw_expr_1.RawExprUtil.queryTree(left),
            new query_tree_1.FunctionCall("NOT IN", [
                ...args.map(raw_expr_1.RawExprUtil.queryTree),
            ]),
        ]);
    }
}
//https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#function_not-in
function notInExprList(left, arg0, ...args) {
    return new expr_1.Expr({
        usedRef: raw_expr_1.RawExprUtil.intersectUsedRefTuple(left, arg0, ...args),
        assertDelegate: dataType.boolean(),
    }, [
        raw_expr_1.RawExprUtil.queryTree(left),
        new query_tree_1.FunctionCall("NOT IN", [
            raw_expr_1.RawExprUtil.queryTree(arg0),
            ...args.map(raw_expr_1.RawExprUtil.queryTree),
        ]),
    ]);
}
function notIn(left, ...args) {
    if (primitive_expr_1.isNonNullPrimitiveExprArray(args)) {
        return notInPrimitiveList(left, ...args);
    }
    else {
        return notInExprList(left, args[0], ...args.slice(1));
    }
}
exports.notIn = notIn;
//# sourceMappingURL=not-in.js.map