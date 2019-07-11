"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const raw_expr_1 = require("../../../../raw-expr");
const expr_1 = require("../../../../expr");
const query_tree_1 = require("../../../../query-tree");
const dataType = require("../../../../data-type");
const function_1 = require("../../../function");
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
function bigIntMul(...arr) {
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
        //By convention, multiplying zero numbers is one.
        return new expr_1.Expr({
            usedRef: usedRef,
            assertDelegate: dataType.bigint(),
        }, raw_expr_1.RawExprUtil.queryTree(1));
    }
    else {
        return new expr_1.Expr({
            usedRef: usedRef,
            assertDelegate: dataType.bigint(),
        }, queryTree);
    }
}
exports.bigIntMul = bigIntMul;
/**
 * We cannot always perform integer multiplication naively in SQL.
 *
 * Error #1690 - BIGINT UNSIGNED value is out of range
 * ```sql
 * SELECT CAST(1 AS UNSIGNED INTEGER) * CAST(-2 AS SIGNED INTEGER)
 * ```
 *
 * -----
 *
 * If either `x` or `y` are `UNSIGNED`,
 * we need to cast both to `SIGNED` before performing multiplication,
 * if we want to allow negative numbers.
 *
 * ```sql
 * SELECT CAST(x AS SIGNED INTEGER) * CAST(y AS SIGNED INTEGER)
 * ```
 *
 * @param arr
 */
function bigIntMulAsSignedInteger(...arr) {
    return bigIntMul(...arr.map(x => function_1.castAsSignedInteger(x)));
}
exports.bigIntMulAsSignedInteger = bigIntMulAsSignedInteger;
//# sourceMappingURL=mul.js.map