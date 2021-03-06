import * as sd from "type-mapping";
import {Expr} from "../../../expr";
import {RawExpr} from "../../../raw-expr";
import {PrimitiveExpr} from "../../../primitive-expr";
import {RawExprUtil} from "../../../raw-expr";
import {ColumnRefUtil} from "../../../column-ref";
import * as dataType from "../../../data-type";

export type NullSafeComparison = (
    <
        LeftT extends RawExpr<PrimitiveExpr>,
        RightT extends RawExpr<RawExprUtil.TypeOf<LeftT>|null>
    >(
        left : LeftT,
        right : RightT
    ) => (
        Expr<{
            usedRef : ColumnRefUtil.Intersect<
                RawExprUtil.UsedRef<LeftT>,
                RawExprUtil.UsedRef<RightT>
            >,
            assertDelegate : sd.SafeMapper<boolean>,
        }>
    )
);
/*
    Factory for making null-safe comparison operators.
*/
export function nullSafeComparison (operator : string) : NullSafeComparison {
    const result : NullSafeComparison = (left, right) => {
        return new Expr(
            {
                usedRef : ColumnRefUtil.intersect(
                    RawExprUtil.usedRef(left),
                    RawExprUtil.usedRef(right)
                ),
                assertDelegate : dataType.boolean(),
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