import * as sd from "schema-decorator";
import {RawExpr, RawExprUtil} from "../../../../raw-expr";
import {Expr, ExprData} from "../../../../expr";
import {Tuple} from "../../../../tuple";
import {QueryTree, Parentheses, QueryTreeArray} from "../../../../query-tree";
import * as dataType from "../../../../data-type";

//https://dev.mysql.com/doc/refman/8.0/en/arithmetic-functions.html#operator_minus
class BigIntSubExpr<DataT extends Pick<ExprData, "usedRef">> extends Expr<{
    usedRef : DataT["usedRef"],
    assertDelegate : sd.AssertDelegate<bigint>,
}> {
    constructor (
        data : DataT,
        queryTree : QueryTree
    ) {
        super(
            {
                usedRef : data.usedRef,
                assertDelegate : dataType.bigint
            },
            queryTree
        );
    }
}
export function bigIntSub<ArrT extends Tuple<RawExpr<bigint>>> (
    ...arr : ArrT
) : (
    Expr<{
        usedRef : RawExprUtil.IntersectUsedRefTuple<ArrT>,
        assertDelegate : sd.AssertDelegate<bigint>,
    }>
) {
    const usedRef = RawExprUtil.intersectUsedRefTuple(...arr);
    const queryTree : QueryTreeArray = [];

    for (let rawExpr of arr) {
        if (rawExpr instanceof BigIntSubExpr) {
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
        return new BigIntSubExpr(
            {
                usedRef : usedRef,
            },
            RawExprUtil.queryTree(0)
        );
    } else {
        return new BigIntSubExpr(
            {
                usedRef : usedRef,
            },
            queryTree
        );
    }
}