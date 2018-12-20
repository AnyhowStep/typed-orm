import * as sd from "schema-decorator";
import {Expr} from "../../../expr";
import {RawExpr} from "../../../raw-expr";
import {NonNullPrimitiveExpr} from "../../../primitive-expr";
import {RawExprUtil} from "../../../raw-expr";

export type TernaryComparison = (
    <
        LeftT extends RawExpr<NonNullPrimitiveExpr>,
        MidT extends RawExpr<RawExprUtil.TypeOf<LeftT>>,
        RightT extends RawExpr<RawExprUtil.TypeOf<LeftT>>
    >(
        left : LeftT,
        mid : MidT,
        right : RightT
    ) => (
        Expr<{
            //TODO Investigate efficiency?
            usedRef : RawExprUtil.IntersectUsedRefTuple<
                [LeftT, MidT, RightT]
            >,
            assertDelegate : sd.AssertDelegate<boolean>,
        }>
    )
);
/*
    Factory for making ternary comparison operators.
*/
export function ternaryComparison (leftOperator : string, rightOperator : string) : TernaryComparison {
    const result : TernaryComparison = (left, mid, right) => {
        return new Expr(
            {
                usedRef : RawExprUtil.intersectUsedRefTuple(
                    left, mid, right
                ),
                assertDelegate : sd.numberToBoolean(),
            },
            [
                RawExprUtil.queryTree(left),
                leftOperator,
                RawExprUtil.queryTree(mid),
                rightOperator,
                RawExprUtil.queryTree(right),
            ]
        );
    };
    return result;
}