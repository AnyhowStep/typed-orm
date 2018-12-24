"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const raw_expr_1 = require("../../../../raw-expr");
const expr_1 = require("../../../../expr");
const query_tree_1 = require("../../../../query-tree");
const dataType = require("../../../../data-type");
//https://dev.mysql.com/doc/refman/8.0/en/arithmetic-functions.html#operator_minus
function tryGetSubQueryTree(rawExpr) {
    if (expr_1.ExprUtil.isExpr(rawExpr)) {
        if (rawExpr.queryTree instanceof query_tree_1.Parentheses) {
            const tree = rawExpr.queryTree.getTree();
            if (tree instanceof Array) {
                if (tree.length == 0) {
                    //This shouldn't happen, in general...
                    return [];
                }
                for (let i = 1; i < tree.length; i += 2) {
                    if (tree[i] !== "-") {
                        return undefined;
                    }
                }
                return tree;
            }
        }
    }
    return undefined;
}
function bigIntSub(...arr) {
    const usedRef = raw_expr_1.RawExprUtil.intersectUsedRefTuple(...arr);
    const queryTree = [];
    for (let rawExpr of arr) {
        const subQueryTree = tryGetSubQueryTree(rawExpr);
        if (subQueryTree != undefined) {
            if (subQueryTree.length == 0) {
                continue;
            }
            else {
                if (queryTree.length > 0) {
                    queryTree.push("-");
                }
                queryTree.push(...subQueryTree);
            }
        }
        else {
            if (queryTree.length > 0) {
                queryTree.push("-");
            }
            queryTree.push(raw_expr_1.RawExprUtil.queryTree(rawExpr));
        }
    }
    if (queryTree.length == 0) {
        //By convention, the subtraction of zero numbers is zero
        return new expr_1.Expr({
            usedRef: usedRef,
            assertDelegate: dataType.bigint(),
        }, raw_expr_1.RawExprUtil.queryTree(0));
    }
    else {
        return new expr_1.Expr({
            usedRef: usedRef,
            assertDelegate: dataType.bigint(),
        }, queryTree);
    }
}
exports.bigIntSub = bigIntSub;
//# sourceMappingURL=sub.js.map