import * as sd from "schema-decorator";
import {Expr} from "../../../expr";
import {RawExpr} from "../../../raw-expr";
import {NonNullPrimitiveExpr} from "../../../primitive-expr";
import {RawExprUtil} from "../../../raw-expr";
import * as dataType from "../../../data-type";

export type Comparison = (
    <
        LeftT extends RawExpr<NonNullPrimitiveExpr>,
        RightT extends RawExpr<RawExprUtil.TypeOf<LeftT>>
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
    Factory for making comparison operators.
*/
export function comparison (operator : string) : Comparison {
    const result : Comparison = (left, right) => {
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