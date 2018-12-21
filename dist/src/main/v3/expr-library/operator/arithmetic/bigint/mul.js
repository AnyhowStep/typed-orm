"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const raw_expr_1 = require("../../../../raw-expr");
const expr_1 = require("../../../../expr");
const query_tree_1 = require("../../../../query-tree");
const dataType = require("../../../../data-type");
//https://dev.mysql.com/doc/refman/8.0/en/arithmetic-functions.html#operator_times
class BigIntMulExpr extends expr_1.Expr {
    constructor(data, queryTree) {
        super({
            usedRef: data.usedRef,
            assertDelegate: dataType.bigint
        }, queryTree);
    }
}
function bigIntMul(...arr) {
    const usedRef = raw_expr_1.RawExprUtil.intersectUsedRefTuple(...arr);
    const queryTree = [];
    for (let rawExpr of arr) {
        if (rawExpr instanceof BigIntMulExpr) {
            if (rawExpr.queryTree instanceof query_tree_1.Parentheses) {
                const tree = rawExpr.queryTree.getTree();
                if (tree instanceof Array) {
                    if (tree.length == 0) {
                        //This shouldn't happen, in general...
                        continue;
                    }
                    if (queryTree.length > 0) {
                        queryTree.push("*");
                    }
                    queryTree.push(...tree);
                }
                else {
                    if (queryTree.length > 0) {
                        queryTree.push("*");
                    }
                    queryTree.push(tree);
                }
            }
            else {
                if (queryTree.length > 0) {
                    queryTree.push("*");
                }
                queryTree.push(raw_expr_1.RawExprUtil.queryTree(rawExpr));
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
        return new BigIntMulExpr({
            usedRef: usedRef,
        }, raw_expr_1.RawExprUtil.queryTree(1));
    }
    else {
        return new BigIntMulExpr({
            usedRef: usedRef,
        }, queryTree);
    }
}
exports.bigIntMul = bigIntMul;
//# sourceMappingURL=mul.js.map