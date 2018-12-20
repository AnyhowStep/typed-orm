import * as sd from "schema-decorator";
import {Expr} from "../../../expr";
import {RawExpr} from "../../../raw-expr";
import {NonNullPrimitiveExpr} from "../../../primitive-expr";
import {RawExprUtil} from "../../../raw-expr";

export type UnaryComparison = (
    <
        RawExprT extends RawExpr<NonNullPrimitiveExpr>
    >(
        rawExpr : RawExprT
    ) => (
        Expr<{
            usedRef : RawExprUtil.UsedRef<RawExprT>,
            assertDelegate : sd.AssertDelegate<boolean>,
        }>
    )
);
/*
    Factory for making unary comparison operators.
*/
export function unaryComparison (postFixOperator : string) : UnaryComparison {
    const result : UnaryComparison = (rawExpr) => {
        return new Expr(
            {
                usedRef : RawExprUtil.usedRef(rawExpr),
                assertDelegate : sd.numberToBoolean(),
            },
            [
                RawExprUtil.queryTree(rawExpr),
                postFixOperator
            ]
        );
    };
    return result;
}