"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const raw_expr_1 = require("../../../raw-expr");
const expr_1 = require("../../../expr");
const query_tree_1 = require("../../../query-tree");
const dataType = require("../../../data-type");
function tryGetOrQueryTree(rawExpr) {
    const falseLiteral = raw_expr_1.RawExprUtil.queryTree(false);
    if (expr_1.ExprUtil.isExpr(rawExpr)) {
        if (rawExpr.queryTree instanceof query_tree_1.Parentheses) {
            const tree = rawExpr.queryTree.getTree();
            if (tree === falseLiteral) {
                return [];
            }
            if (tree instanceof Array) {
                if (tree.length == 0) {
                    //This shouldn't happen, in general...
                    return [];
                }
                if (tree.length == 1 && tree[0] === falseLiteral) {
                    //Makes resultant queries "tidier" if we eliminate all false constants
                    return [];
                }
                for (let i = 1; i < tree.length; i += 2) {
                    if (tree[i] !== "OR") {
                        return undefined;
                    }
                }
                return tree;
            }
        }
        else if (rawExpr.queryTree === falseLiteral) {
            return [];
        }
    }
    return undefined;
}
function or(...arr) {
    const usedRef = raw_expr_1.RawExprUtil.intersectUsedRefTuple(...arr);
    const queryTree = [];
    for (let rawExpr of arr) {
        const orQueryTree = tryGetOrQueryTree(rawExpr);
        if (orQueryTree != undefined) {
            if (orQueryTree.length == 0) {
                continue;
            }
            else {
                if (queryTree.length > 0) {
                    queryTree.push("OR");
                }
                queryTree.push(...orQueryTree);
            }
        }
        else {
            //Makes resultant queries "tidier" if we eliminate all false constants
            if (rawExpr === false) {
                continue;
            }
            if (queryTree.length > 0) {
                queryTree.push("OR");
            }
            queryTree.push(raw_expr_1.RawExprUtil.queryTree(rawExpr));
        }
    }
    if (queryTree.length == 0) {
        return new expr_1.Expr({
            usedRef: usedRef,
            assertDelegate: dataType.boolean(),
        }, raw_expr_1.RawExprUtil.queryTree(false));
    }
    else {
        return new expr_1.Expr({
            usedRef: usedRef,
            assertDelegate: dataType.boolean(),
        }, queryTree);
    }
}
exports.or = or;
//# sourceMappingURL=or.js.map