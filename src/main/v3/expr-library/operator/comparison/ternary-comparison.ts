import * as sd from "schema-decorator";
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
            usedColumns : (
                RawExprUtil.UsedColumns<LeftT>[number] |
                RawExprUtil.UsedColumns<MidT>[number] |
                RawExprUtil.UsedColumns<RightT>[number]
            )[],
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
                usedColumns : RawExprUtil.Array.usedColumns([
                    left, mid, right
                ]),
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