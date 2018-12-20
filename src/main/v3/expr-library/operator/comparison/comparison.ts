import * as sd from "schema-decorator";
import {Expr} from "../../../expr";
import {RawExpr} from "../../../raw-expr";
import {NonNullPrimitiveExpr} from "../../../primitive-expr";
import {RawExprUtil} from "../../../raw-expr";
import {ColumnRefUtil} from "../../../column-ref";

export type Comparison = (
    <
        LeftT extends RawExpr<NonNullPrimitiveExpr>,
        RightT extends RawExpr<RawExprUtil.TypeOf<LeftT>>
    >(
        left : LeftT,
        right : RightT
    ) => (
        Expr<{
            usedRef : ColumnRefUtil.Intersect<
                RawExprUtil.UsedRef<LeftT>,
                RawExprUtil.UsedRef<RightT>
            >,
            assertDelegate : sd.AssertDelegate<boolean>,
        }>
    )
);
/*
    Factory for making comparison operators.
*/
export function comparison (operator : string) : Comparison {
    const result : Comparison = (left, right) => {
        return new Expr(
            {
                usedRef : ColumnRefUtil.intersect(
                    RawExprUtil.usedRef(left),
                    RawExprUtil.usedRef(right)
                ),
                assertDelegate : sd.numberToBoolean(),
            },
            [
                RawExprUtil.queryTree(left),
                operator,
                RawExprUtil.queryTree(right),
            ]
        );
    };
    return result;
}