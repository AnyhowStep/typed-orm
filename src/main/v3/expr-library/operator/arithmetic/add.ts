import * as sd from "schema-decorator";
import {RawExpr, RawExprUtil} from "../../../raw-expr";
import {Expr, ExprUtil} from "../../../expr";
import {Tuple} from "../../../tuple";
import {Parentheses, QueryTreeArray} from "../../../query-tree";

//https://dev.mysql.com/doc/refman/8.0/en/arithmetic-functions.html#operator_plus
function tryGetAddQueryTree (rawExpr : RawExpr<number>) : QueryTreeArray|undefined {
    if (ExprUtil.isExpr(rawExpr)) {
        if (rawExpr.queryTree instanceof Parentheses) {
            const tree = rawExpr.queryTree.getTree();
            if (tree instanceof Array) {
                if (tree.length == 0) {
                    //This shouldn't happen, in general...
                    return [];
                }
                for (let i=1; i<tree.length; i+=2) {
                    if (tree[i] !== "+") {
                        return undefined;
                    }
                }
                return tree;
            }
        }
    }
    return undefined;
}
export function add<ArrT extends Tuple<RawExpr<number>>> (
    ...arr : ArrT
) : (
    Expr<{
        usedRef : RawExprUtil.IntersectUsedRefTuple<ArrT>,
        assertDelegate : sd.AssertDelegate<number>,
    }>
) {
    const usedRef = RawExprUtil.intersectUsedRefTuple(...arr);
    const queryTree : QueryTreeArray = [];

    for (let rawExpr of arr) {
        const addQueryTree = tryGetAddQueryTree(rawExpr);
        if (addQueryTree != undefined) {
            if (addQueryTree.length == 0) {
                continue;
            } else {
                if (queryTree.length > 0) {
                    queryTree.push("+");
                }
                queryTree.push(...addQueryTree);
            }
        } else {
            if (queryTree.length > 0) {
                queryTree.push("+");
            }
            queryTree.push(RawExprUtil.queryTree(rawExpr));
        }
    }
    if (queryTree.length == 0) {
        //TODO Is the addition of zero numbers... zero?
        return new Expr(
            {
                usedRef : usedRef,
                assertDelegate : sd.number(),
            },
            RawExprUtil.queryTree(0)
        );
    } else {
        return new Expr(
            {
                usedRef : usedRef,
                assertDelegate : sd.number(),
            },
            queryTree
        );
    }
}