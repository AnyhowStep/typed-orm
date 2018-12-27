import * as sd from "schema-decorator";
import {Expr} from "../../../expr";
import {RawExpr} from "../../../raw-expr";
import {PrimitiveExpr} from "../../../primitive-expr";
import {RawExprUtil} from "../../../raw-expr";
import * as dataType from "../../../data-type";

export type NullSafeUnaryComparison = (
    <
        RawExprT extends RawExpr<PrimitiveExpr>
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
    Factory for making null-safe unary comparison operators.
*/
export function nullSafeUnaryComparison (postFixOperator : string) : NullSafeUnaryComparison {
    const result : NullSafeUnaryComparison = (rawExpr) => {
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