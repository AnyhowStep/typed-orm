import * as sd from "type-mapping";
import {Expr} from "../../../expr";
import {RawExpr} from "../../../raw-expr";
import {NonNullPrimitiveExpr} from "../../../primitive-expr";
import {RawExprUtil} from "../../../raw-expr";
import * as dataType from "../../../data-type";

export type UnaryComparison = (
    <
        RawExprT extends RawExpr<NonNullPrimitiveExpr>
    >(
        rawExpr : RawExprT
    ) => (
        Expr<{
            usedRef : RawExprUtil.UsedRef<RawExprT>,
            assertDelegate : sd.SafeMapper<boolean>,
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
                assertDelegate : dataType.boolean(),
            },
            [
                RawExprUtil.queryTree(rawExpr),
                postFixOperator
            ]
        );
    };
    return result;
}