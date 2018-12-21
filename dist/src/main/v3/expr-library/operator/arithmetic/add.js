"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const raw_expr_1 = require("../../../raw-expr");
const expr_1 = require("../../../expr");
const query_tree_1 = require("../../../query-tree");
//https://dev.mysql.com/doc/refman/8.0/en/arithmetic-functions.html#operator_plus
class AddExpr extends expr_1.Expr {
    constructor(data, queryTree) {
        super({
            usedRef: data.usedRef,
            assertDelegate: sd.number()
        }, queryTree);
    }
}
function add(...arr) {
    const usedRef = raw_expr_1.RawExprUtil.intersectUsedRefTuple(...arr);
    const queryTree = [];
    for (let rawExpr of arr) {
        if (rawExpr instanceof AddExpr) {
            if (rawExpr.queryTree instanceof query_tree_1.Parentheses) {
                const tree = rawExpr.queryTree.getTree();
                if (tree instanceof Array) {
                    if (tree.length == 0) {
                        //This shouldn't happen, in general...
                        continue;
                    }
                    if (queryTree.length > 0) {
                        queryTree.push("+");
                    }
                    queryTree.push(...tree);
                }
                else {
                    if (queryTree.length > 0) {
                        queryTree.push("+");
                    }
                    queryTree.push(tree);
                }
            }
            else {
                if (queryTree.length > 0) {
                    queryTree.push("+");
                }
                queryTree.push(raw_expr_1.RawExprUtil.queryTree(rawExpr));
            }
        }
        else {
            if (queryTree.length > 0) {
                queryTree.push("+");
            }
            queryTree.push(raw_expr_1.RawExprUtil.queryTree(rawExpr));
        }
    }
    if (queryTree.length == 0) {
        //TODO Is the addition of zero numbers... zero?
        return new AddExpr({
            usedRef: usedRef,
        }, raw_expr_1.RawExprUtil.queryTree(0));
    }
    else {
        return new AddExpr({
            usedRef: usedRef,
        }, queryTree);
    }
}
exports.add = add;
//# sourceMappingURL=add.js.map