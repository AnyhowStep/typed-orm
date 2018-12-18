"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const raw_expr_1 = require("../../../raw-expr");
const expr_1 = require("../../../expr");
const query_tree_1 = require("../../../query-tree");
class AndExpr extends expr_1.Expr {
    constructor(data, queryTree) {
        super({
            usedRef: data.usedRef,
            assertDelegate: sd.numberToBoolean()
        }, queryTree);
    }
}
function and(...arr) {
    const usedRef = raw_expr_1.RawExprUtil.intersectUsedRefTuple(...arr);
    const queryTree = [];
    const trueLiteral = raw_expr_1.RawExprUtil.queryTree(true);
    for (let rawExpr of arr) {
        if (rawExpr instanceof AndExpr) {
            if (rawExpr.queryTree === trueLiteral) {
                continue;
            }
            else if (rawExpr.queryTree instanceof query_tree_1.Parentheses) {
                const tree = rawExpr.queryTree.getTree();
                if (tree instanceof Array) {
                    if (tree.length == 0) {
                        //This shouldn't happen, in general...
                        continue;
                    }
                    if (tree.length == 1 && tree[0] === trueLiteral) {
                        //Makes resultant queries "tidier" if we eliminate all true constants
                        continue;
                    }
                    if (queryTree.length > 0) {
                        queryTree.push("AND");
                    }
                    queryTree.push(...tree);
                }
                else {
                    //Makes resultant queries "tidier" if we eliminate all true constants
                    if (tree === trueLiteral) {
                        continue;
                    }
                    if (queryTree.length > 0) {
                        queryTree.push("AND");
                    }
                    queryTree.push(tree);
                }
            }
            else {
                if (queryTree.length > 0) {
                    queryTree.push("AND");
                }
                queryTree.push(raw_expr_1.RawExprUtil.queryTree(rawExpr));
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
        return new AndExpr({
            usedRef: usedRef,
        }, trueLiteral);
    }
    else {
        return new AndExpr({
            usedRef: usedRef,
        }, queryTree);
    }
}
exports.and = and;
//# sourceMappingURL=and.js.map