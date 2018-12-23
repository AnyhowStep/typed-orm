"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const raw_expr_1 = require("../../../raw-expr");
const expr_1 = require("../../../expr");
const query_tree_1 = require("../../../query-tree");
function tryGetAndQueryTree(rawExpr) {
    const trueLiteral = raw_expr_1.RawExprUtil.queryTree(true);
    if (expr_1.ExprUtil.isExpr(rawExpr)) {
        if (rawExpr.queryTree instanceof query_tree_1.Parentheses) {
            const tree = rawExpr.queryTree.getTree();
            if (tree === trueLiteral) {
                return [];
            }
            if (tree instanceof Array) {
                if (tree.length == 0) {
                    //This shouldn't happen, in general...
                    return [];
                }
                if (tree.length == 1 && tree[0] === trueLiteral) {
                    //Makes resultant queries "tidier" if we eliminate all true constants
                    return [];
                }
                for (let i = 1; i < tree.length; i += 2) {
                    if (tree[i] !== "AND") {
                        return undefined;
                    }
                }
                return tree;
            }
        }
        else if (rawExpr.queryTree === trueLiteral) {
            return [];
        }
    }
    return undefined;
}
function and(...arr) {
    const usedRef = raw_expr_1.RawExprUtil.intersectUsedRefTuple(...arr);
    const queryTree = [];
    for (let rawExpr of arr) {
        const andQueryTree = tryGetAndQueryTree(rawExpr);
        if (andQueryTree != undefined) {
            if (andQueryTree.length == 0) {
                continue;
            }
            else {
                if (queryTree.length > 0) {
                    queryTree.push("AND");
                }
                queryTree.push(...andQueryTree);
            }
        }
        else {
            //Makes resultant queries "tidier" if we eliminate all true constants
            if (rawExpr === true) {
                continue;
            }
            if (queryTree.length > 0) {
                queryTree.push("AND");
            }
            queryTree.push(raw_expr_1.RawExprUtil.queryTree(rawExpr));
        }
    }
    if (queryTree.length == 0) {
        return new expr_1.Expr({
            usedRef,
            assertDelegate: sd.numberToBoolean(),
        }, raw_expr_1.RawExprUtil.queryTree(true));
    }
    else {
        return new expr_1.Expr({
            usedRef,
            assertDelegate: sd.numberToBoolean(),
        }, queryTree);
    }
}
exports.and = and;
//# sourceMappingURL=and.js.map