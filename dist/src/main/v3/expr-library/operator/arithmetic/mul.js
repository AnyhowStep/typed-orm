"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const raw_expr_1 = require("../../../raw-expr");
const expr_1 = require("../../../expr");
const query_tree_1 = require("../../../query-tree");
//https://dev.mysql.com/doc/refman/8.0/en/arithmetic-functions.html#operator_times
function tryGetMulQueryTree(rawExpr) {
    if (expr_1.ExprUtil.isExpr(rawExpr)) {
        if (rawExpr.queryTree instanceof query_tree_1.Parentheses) {
            const tree = rawExpr.queryTree.getTree();
            if (tree instanceof Array) {
                if (tree.length == 0) {
                    //This shouldn't happen, in general...
                    return [];
                }
                for (let i = 1; i < tree.length; i += 2) {
                    if (tree[i] !== "*") {
                        return undefined;
                    }
                }
                return tree;
            }
        }
    }
    return undefined;
}
function mul(...arr) {
    const usedRef = raw_expr_1.RawExprUtil.intersectUsedRefTuple(...arr);
    const queryTree = [];
    for (let rawExpr of arr) {
        const mulQueryTree = tryGetMulQueryTree(rawExpr);
        if (mulQueryTree != undefined) {
            if (mulQueryTree.length == 0) {
                continue;
            }
            else {
                if (queryTree.length > 0) {
                    queryTree.push("*");
                }
                queryTree.push(...mulQueryTree);
            }
        }
        else {
            if (queryTree.length > 0) {
                queryTree.push("*");
            }
            queryTree.push(raw_expr_1.RawExprUtil.queryTree(rawExpr));
        }
    }
    if (queryTree.length == 0) {
        //TODO Is the multiplication of zero numbers... one?
        return new expr_1.Expr({
            usedRef: usedRef,
            assertDelegate: sd.number(),
        }, raw_expr_1.RawExprUtil.queryTree(1));
    }
    else {
        return new expr_1.Expr({
            usedRef: usedRef,
            assertDelegate: sd.number(),
        }, queryTree);
    }
}
exports.mul = mul;
//# sourceMappingURL=mul.js.map