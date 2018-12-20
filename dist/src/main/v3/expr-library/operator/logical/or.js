"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const raw_expr_1 = require("../../../raw-expr");
const expr_1 = require("../../../expr");
const query_tree_1 = require("../../../query-tree");
class OrExpr extends expr_1.Expr {
    constructor(data, queryTree) {
        super({
            usedRef: data.usedRef,
            assertDelegate: sd.numberToBoolean()
        }, queryTree);
    }
}
function or(...arr) {
    const usedRef = raw_expr_1.RawExprUtil.intersectUsedRefTuple(...arr);
    const queryTree = [];
    const falseLiteral = raw_expr_1.RawExprUtil.queryTree(false);
    for (let rawExpr of arr) {
        if (rawExpr instanceof OrExpr) {
            if (rawExpr.queryTree === falseLiteral) {
                continue;
            }
            else if (rawExpr.queryTree instanceof query_tree_1.Parentheses) {
                const tree = rawExpr.queryTree.getTree();
                if (tree instanceof Array) {
                    if (tree.length == 0) {
                        //This shouldn't happen, in general...
                        continue;
                    }
                    if (tree.length == 1 && tree[0] === falseLiteral) {
                        //Makes resultant queries "tidier" if we eliminate all false constants
                        continue;
                    }
                    if (queryTree.length > 0) {
                        queryTree.push("OR");
                    }
                    queryTree.push(...tree);
                }
                else {
                    //Makes resultant queries "tidier" if we eliminate all false constants
                    if (tree === falseLiteral) {
                        continue;
                    }
                    if (queryTree.length > 0) {
                        queryTree.push("OR");
                    }
                    queryTree.push(tree);
                }
            }
            else {
                if (queryTree.length > 0) {
                    queryTree.push("OR");
                }
                queryTree.push(raw_expr_1.RawExprUtil.queryTree(rawExpr));
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
        return new OrExpr({
            usedRef: usedRef,
        }, falseLiteral);
    }
    else {
        return new OrExpr({
            usedRef: usedRef,
        }, queryTree);
    }
}
exports.or = or;
//# sourceMappingURL=or.js.map