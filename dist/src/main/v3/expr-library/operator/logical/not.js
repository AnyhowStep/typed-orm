"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const raw_expr_1 = require("../../../raw-expr");
const expr_1 = require("../../../expr");
const query_tree_1 = require("../../../query-tree");
const constant = require("../../constant");
function not(rawExpr) {
    if (rawExpr === true) {
        //NOT TRUE === FALSE
        return constant.false();
    }
    if (rawExpr === false) {
        //NOT FALSE === TRUE
        return constant.true();
    }
    if (expr_1.ExprUtil.isExpr(rawExpr)) {
        if (rawExpr.queryTree instanceof query_tree_1.Parentheses) {
            const tree = rawExpr.queryTree.getTree();
            if (tree instanceof Array && tree.length == 2) {
                if (tree[0] === "NOT") {
                    //NOT (NOT (expr)) === expr
                    return new expr_1.Expr({
                        usedRef: raw_expr_1.RawExprUtil.usedRef(rawExpr),
                        assertDelegate: sd.numberToBoolean(),
                    }, tree[1]);
                }
            }
        }
        else if (rawExpr.queryTree == raw_expr_1.RawExprUtil.queryTree(true)) {
            //NOT TRUE === FALSE
            return constant.false();
        }
        else if (rawExpr.queryTree == raw_expr_1.RawExprUtil.queryTree(false)) {
            //NOT FALSE === TRUE
            return constant.true();
        }
    }
    return new expr_1.Expr({
        usedRef: raw_expr_1.RawExprUtil.usedRef(rawExpr),
        assertDelegate: sd.numberToBoolean(),
    }, [
        "NOT",
        raw_expr_1.RawExprUtil.queryTree(rawExpr)
    ]);
}
exports.not = not;
//# sourceMappingURL=not.js.map