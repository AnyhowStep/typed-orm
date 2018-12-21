import * as sd from "schema-decorator";
import {RawExpr, RawExprUtil} from "../../../raw-expr";
import {Expr, ExprData} from "../../../expr";
import {Tuple} from "../../../tuple";
import {QueryTree, Parentheses, QueryTreeArray} from "../../../query-tree";

//https://dev.mysql.com/doc/refman/8.0/en/arithmetic-functions.html#operator_minus
class SubExpr<DataT extends Pick<ExprData, "usedRef">> extends Expr<{
    usedRef : DataT["usedRef"],
    assertDelegate : sd.AssertDelegate<number>,
}> {
    constructor (
        data : DataT,
        queryTree : QueryTree
    ) {
        super(
            {
                usedRef : data.usedRef,
                assertDelegate : sd.number()
            },
            queryTree
        );
    }
}
export function sub<ArrT extends Tuple<RawExpr<number>>> (
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
        if (rawExpr instanceof SubExpr) {
            if (rawExpr.queryTree instanceof Parentheses) {
                const tree = rawExpr.queryTree.getTree();
                if (tree instanceof Array) {
                    if (tree.length == 0) {
                        //This shouldn't happen, in general...
                        continue;
                    }
                    if (queryTree.length > 0) {
                        queryTree.push("-");
                    }
                    queryTree.push(...tree);
                } else {
                    if (queryTree.length > 0) {
                        queryTree.push("-");
                    }
                    queryTree.push(tree);
                }
            } else {
                if (queryTree.length > 0) {
                    queryTree.push("-");
                }
                queryTree.push(RawExprUtil.queryTree(rawExpr));
            }
        } else {
            if (queryTree.length > 0) {
                queryTree.push("-");
            }
            queryTree.push(RawExprUtil.queryTree(rawExpr));
        }
    }
    if (queryTree.length == 0) {
        //TODO Is the subtraction of zero numbers... zero?
        return new SubExpr(
            {
                usedRef : usedRef,
            },
            RawExprUtil.queryTree(0)
        );
    } else {
        return new SubExpr(
            {
                usedRef : usedRef,
            },
            queryTree
        );
    }
}