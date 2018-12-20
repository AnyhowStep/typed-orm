import * as sd from "schema-decorator";
import {RawExpr, RawExprUtil} from "../../../raw-expr";
import {Expr, ExprData} from "../../../expr";
import {Tuple} from "../../../tuple";
import {QueryTree, Parentheses, QueryTreeArray} from "../../../query-tree";

class OrExpr<DataT extends Pick<ExprData, "usedRef">> extends Expr<{
    usedRef : DataT["usedRef"],
    assertDelegate : sd.AssertDelegate<boolean>,
}> {
    constructor (
        data : DataT,
        queryTree : QueryTree
    ) {
        super(
            {
                usedRef : data.usedRef,
                assertDelegate : sd.numberToBoolean()
            },
            queryTree
        );
    }
}
export function or<ArrT extends Tuple<RawExpr<boolean>>> (
    ...arr : ArrT
) : (
    Expr<{
        usedRef : RawExprUtil.IntersectUsedRefTuple<ArrT>,
        assertDelegate : sd.AssertDelegate<boolean>,
    }>
) {
    const usedRef = RawExprUtil.intersectUsedRefTuple(...arr);
    const queryTree : QueryTreeArray = [];

    const falseLiteral = RawExprUtil.queryTree(false);

    for (let rawExpr of arr) {
        if (rawExpr instanceof OrExpr) {
            if (rawExpr.queryTree === falseLiteral) {
                continue;
            } else if (rawExpr.queryTree instanceof Parentheses) {
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
                } else {
                    //Makes resultant queries "tidier" if we eliminate all false constants
                    if (tree === falseLiteral) {
                        continue;
                    }
                    if (queryTree.length > 0) {
                        queryTree.push("OR");
                    }
                    queryTree.push(tree);
                }
            } else {
                if (queryTree.length > 0) {
                    queryTree.push("OR");
                }
                queryTree.push(RawExprUtil.queryTree(rawExpr));
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
        return new OrExpr(
            {
                usedRef : usedRef,
            },
            falseLiteral
        );
    } else {
        return new OrExpr(
            {
                usedRef : usedRef,
            },
            queryTree
        );
    }
}