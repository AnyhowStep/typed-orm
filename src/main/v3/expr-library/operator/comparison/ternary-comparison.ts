import * as sd from "type-mapping";
import {Expr} from "../../../expr";
import {RawExpr} from "../../../raw-expr";
import {NonNullPrimitiveExpr} from "../../../primitive-expr";
import {RawExprUtil} from "../../../raw-expr";
import * as dataType from "../../../data-type";

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
            //TODO-DEBATE Investigate efficiency?
            usedRef : RawExprUtil.IntersectUsedRefTuple<
                [LeftT, MidT, RightT]
            >,
            assertDelegate : sd.SafeMapper<boolean>,
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
                assertDelegate : dataType.boolean(),
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