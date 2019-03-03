import * as sd from "schema-decorator";
import {RawExpr, RawExprUtil} from "../../../raw-expr";
import {Expr, ExprUtil} from "../../../expr";
import {Parentheses, QueryTreeArray} from "../../../query-tree";
import * as dataType from "../../../data-type";

function tryGetOrQueryTree (rawExpr : RawExpr<boolean>) : QueryTreeArray|undefined {
    const falseLiteral = RawExprUtil.queryTree(false);

    if (ExprUtil.isExpr(rawExpr)) {
        if (rawExpr.queryTree instanceof Parentheses) {
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
                for (let i=1; i<tree.length; i+=2) {
                    if (tree[i] !== "OR") {
                        return undefined;
                    }
                }
                return tree;
            }
        } else if (rawExpr.queryTree === falseLiteral) {
            return [];
        }
    }
    return undefined;
}
export function or<ArrT extends RawExpr<boolean>[]> (
    ...arr : ArrT
) : (
    Expr<{
        usedRef : RawExprUtil.IntersectUsedRefTuple<ArrT>,
        assertDelegate : sd.AssertDelegate<boolean>,
    }>
) {
    const usedRef = RawExprUtil.intersectUsedRefTuple(...arr);
    const queryTree : QueryTreeArray = [];

    for (let rawExpr of arr) {
        const orQueryTree = tryGetOrQueryTree(rawExpr);
        if (orQueryTree != undefined) {
            if (orQueryTree.length == 0) {
                continue;
            } else {
                if (queryTree.length > 0) {
                    queryTree.push("OR");
                }
                queryTree.push(...orQueryTree);
            }
        } else {
            //Makes resultant queries "tidier" if we eliminate all false constants
            if (rawExpr === false) {
                continue;
            }
            if (queryTree.length > 0) {
                queryTree.push("OR");
            }
            queryTree.push(RawExprUtil.queryTree(rawExpr));
        }
    }
    if (queryTree.length == 0) {
        return new Expr(
            {
                usedRef : usedRef,
                assertDelegate : dataType.boolean(),
            },
            RawExprUtil.queryTree(false)
        );
    } else {
        return new Expr(
            {
                usedRef : usedRef,
                assertDelegate : dataType.boolean(),
            },
            queryTree
        );
    }
}