"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const raw_expr_1 = require("../../../raw-expr");
const expr_1 = require("../../../expr");
const query_tree_1 = require("../../../query-tree");
const constant = require("../../constant");
class NotExpr extends expr_1.Expr {
    constructor(data, queryTree) {
        super({
            usedRef: data.usedRef,
            assertDelegate: sd.numberToBoolean()
        }, queryTree);
    }
}
function not(rawExpr) {
    if (rawExpr instanceof NotExpr) {
        //NOT (NOT (expr)) === expr
        if (rawExpr.queryTree instanceof query_tree_1.Parentheses) {
            const tree = rawExpr.queryTree.getTree();
            if (tree instanceof Array && tree.length == 2) {
                return new expr_1.Expr({
                    usedRef: rawExpr.usedRef,
                    assertDelegate: rawExpr.assertDelegate,
                }, tree[1]);
            }
        }
    }
    else if (rawExpr === true) {
        //NOT TRUE === FALSE
        return constant.false;
    }
    else if (rawExpr === false) {
        //NOT FALSE === TRUE
        return constant.true;
    }
    else if (rawExpr instanceof expr_1.Expr) {
        if (rawExpr.queryTree == raw_expr_1.RawExprUtil.queryTree(true)) {
            //NOT TRUE === FALSE
            return constant.false;
        }
        else if (rawExpr.queryTree == raw_expr_1.RawExprUtil.queryTree(false)) {
            //NOT FALSE === TRUE
            return constant.true;
        }
    }
    return new NotExpr({
        usedRef: raw_expr_1.RawExprUtil.usedRef(rawExpr),
    }, [
        "NOT",
        raw_expr_1.RawExprUtil.queryTree(rawExpr)
    ]);
}
exports.not = not;
//# sourceMappingURL=not.js.map