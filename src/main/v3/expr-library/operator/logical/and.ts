import * as sd from "schema-decorator";
import {RawExpr, RawExprUtil} from "../../../raw-expr";
import {Expr, ExprData} from "../../../expr";
import {Tuple} from "../../../tuple";
import {QueryTree, Parentheses, QueryTreeArray} from "../../../query-tree";

class AndExpr<DataT extends Pick<ExprData, "usedRef">> extends Expr<{
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
export function and<ArrT extends Tuple<RawExpr<boolean>>> (
    ...arr : ArrT
) : (
    Expr<{
        usedRef : RawExprUtil.IntersectUsedRefTuple<ArrT>,
        assertDelegate : sd.AssertDelegate<boolean>,
    }>
) {
    const usedRef = RawExprUtil.intersectUsedRefTuple(...arr);
    const queryTree : QueryTreeArray = [];

    const trueLiteral = RawExprUtil.queryTree(true);

    for (let rawExpr of arr) {
        if (rawExpr instanceof AndExpr) {
            if (rawExpr.queryTree === trueLiteral) {
                continue;
            } else if (rawExpr.queryTree instanceof Parentheses) {
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
                } else {
                    //Makes resultant queries "tidier" if we eliminate all true constants
                    if (tree === trueLiteral) {
                        continue;
                    }
                    if (queryTree.length > 0) {
                        queryTree.push("AND");
                    }
                    queryTree.push(tree);
                }
            } else {
                if (queryTree.length > 0) {
                    queryTree.push("AND");
                }
                queryTree.push(RawExprUtil.queryTree(rawExpr));
            }
        } else {
            //Makes resultant queries "tidier" if we eliminate all true constants
            if (rawExpr === true) {
                continue;
            }
            if (queryTree.length > 0) {
                queryTree.push("AND");
            }
            queryTree.push(RawExprUtil.queryTree(rawExpr));
        }
    }
    if (queryTree.length == 0) {
        return new AndExpr(
            {
                usedRef : usedRef,
            },
            trueLiteral
        );
    } else {
        return new AndExpr(
            {
                usedRef : usedRef,
            },
            queryTree
        );
    }
}