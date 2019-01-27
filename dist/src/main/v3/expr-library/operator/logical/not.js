"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const raw_expr_1 = require("../../../raw-expr");
const expr_1 = require("../../../expr");
const query_tree_1 = require("../../../query-tree");
const constant = require("../../constant");
const dataType = require("../../../data-type");
function not(rawExpr) {
    if (rawExpr === true) {
        //NOT TRUE === FALSE
        return constant.falseLiteral();
    }
    if (rawExpr === false) {
        //NOT FALSE === TRUE
        return constant.trueLiteral();
    }
    if (expr_1.ExprUtil.isExpr(rawExpr)) {
        if (rawExpr.queryTree instanceof query_tree_1.Parentheses) {
            const tree = rawExpr.queryTree.getTree();
            if (tree instanceof Array && tree.length == 2) {
                if (tree[0] === "NOT") {
                    //NOT (NOT (expr)) === expr
                    return new expr_1.Expr({
                        usedColumns: raw_expr_1.RawExprUtil.usedColumns(rawExpr),
                        assertDelegate: dataType.boolean(),
                    }, tree[1]);
                }
            }
        }
        else if (rawExpr.queryTree == raw_expr_1.RawExprUtil.queryTree(true)) {
            //NOT TRUE === FALSE
            return constant.falseLiteral();
        }
        else if (rawExpr.queryTree == raw_expr_1.RawExprUtil.queryTree(false)) {
            //NOT FALSE === TRUE
            return constant.trueLiteral();
        }
    }
    return new expr_1.Expr({
        usedColumns: raw_expr_1.RawExprUtil.usedColumns(rawExpr),
        assertDelegate: dataType.boolean(),
    }, [
        "NOT",
        raw_expr_1.RawExprUtil.queryTree(rawExpr)
    ]);
}
exports.not = not;
//# sourceMappingURL=not.js.map