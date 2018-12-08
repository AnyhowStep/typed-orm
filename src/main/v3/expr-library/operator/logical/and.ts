/*import * as sd from "schema-decorator";
import {Expr} from "../../../expr";
import {RawExpr} from "../../../raw-expr";
import {NonNullPrimitiveExpr} from "../../../primitive-expr";
import {RawExprUtil} from "../../../raw-expr";
import {ColumnRefUtil} from "../../../column-ref";
import {ExprData} from "../../../expr";
import {QueryTree, Parentheses} from "../../../query-tree";

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
export declare function and2<ExprArrT extends RawExpr<boolean>[]> (
    ...arr : ExprArrT
) : (
    Expr<{
        usedRef : ColumnRefUtil.IntersectTuple<
            {
                //TODO More
                [index in Extract<keyof ExprArrT, "0"|"1"|"2"|"3"|"4"|"5">] : (
                    RawExprUtil.UsedRef<LeftT>
                )
            }
        >,
        assertDelegate : sd.AssertDelegate<boolean>,
    }>
)
export function and<
    LeftT extends RawExpr<boolean>,
    R0 extends RawExpr<boolean>
>(
    left : LeftT,
    r0 : R0
) : (
    Expr<{
        usedRef : ColumnRefUtil.Intersect<
            RawExprUtil.UsedRef<LeftT>,
            RawExprUtil.UsedRef<R0>
        >,
        assertDelegate : sd.AssertDelegate<boolean>,
    }>
) {
    return new Expr(
        {
            usedRef : ColumnRefUtil.intersect(
                RawExprUtil.usedRef(left),
                RawExprUtil.usedRef(r0)
            ),
            assertDelegate : sd.numberToBoolean(),
        },
        [
            (left instanceof AndExpr && left.queryTree instanceof Parentheses) ?
            left.queryTree.getTree() :
            RawExprUtil.queryTree(left),
            "AND",
            RawExprUtil.queryTree(r0),
        ]
    );
}*/
//TODO
export function and () {}