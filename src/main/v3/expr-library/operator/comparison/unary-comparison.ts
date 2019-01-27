import * as sd from "schema-decorator";
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
            usedColumns : RawExprUtil.UsedColumns<RawExprT>,
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
                usedColumns : RawExprUtil.usedColumns(rawExpr),
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