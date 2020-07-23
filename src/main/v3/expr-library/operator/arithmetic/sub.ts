import * as sd from "type-mapping";
import {RawExpr, RawExprUtil} from "../../../raw-expr";
import {Expr} from "../../../expr";
import {Tuple} from "../../../tuple";
import {QueryTreeArray} from "../../../query-tree";
import * as dataType from "../../../data-type";

//https://dev.mysql.com/doc/refman/8.0/en/arithmetic-functions.html#operator_minus
export function sub<ArrT extends Tuple<RawExpr<number>>> (
    ...arr : ArrT
) : (
    Expr<{
        usedRef : RawExprUtil.IntersectUsedRefTuple<ArrT>,
        assertDelegate : sd.SafeMapper<number>,
    }>
) {
    const usedRef = RawExprUtil.intersectUsedRefTuple(...arr);
    const queryTree : QueryTreeArray = [];

    for (let rawExpr of arr) {
        if (queryTree.length > 0) {
            queryTree.push("-");
        }
        queryTree.push(RawExprUtil.queryTree(rawExpr));
    }
    if (queryTree.length == 0) {
        //By convention, the subtraction of zero numbers is zero
        return new Expr(
            {
                usedRef : usedRef,
                assertDelegate : dataType.double(),
            },
            RawExprUtil.queryTree(0)
        );
    } else {
        return new Expr(
            {
                usedRef : usedRef,
                assertDelegate : dataType.double(),
            },
            queryTree
        );
    }
}