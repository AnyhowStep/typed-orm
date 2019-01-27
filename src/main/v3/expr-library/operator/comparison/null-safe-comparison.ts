import * as sd from "schema-decorator";
import {Expr} from "../../../expr";
import {RawExpr} from "../../../raw-expr";
import {PrimitiveExpr} from "../../../primitive-expr";
import {RawExprUtil} from "../../../raw-expr";
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
            usedColumns : (
                RawExprUtil.UsedColumns<LeftT>[number] |
                RawExprUtil.UsedColumns<RightT>[number]
            )[],
            assertDelegate : sd.AssertDelegate<boolean>,
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
                usedColumns : RawExprUtil.Array.usedColumns([
                    left,
                    right
                ]),
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