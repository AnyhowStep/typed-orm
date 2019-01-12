import {Expr} from "../../expr";
import {RawExpr, RawExprUtil} from "../../../raw-expr";
import {PrimitiveExpr} from "../../../primitive-expr";

export type FromRawExpr<RawExprT extends RawExpr<PrimitiveExpr>> = (
    Expr<{
        usedRef : RawExprUtil.UsedRef<RawExprT>,
        assertDelegate : RawExprUtil.AssertDelegate<RawExprT>
    }>
);
export function fromRawExpr<
    RawExprT extends RawExpr<PrimitiveExpr>
> (
    rawExpr : RawExprT
) : FromRawExpr<RawExprT> {
    if (rawExpr instanceof Expr) {
        return rawExpr;
    }
    const usedRef = RawExprUtil.usedRef(rawExpr);
    const assertDelegate = RawExprUtil.assertDelegate(rawExpr);
    const queryTree = RawExprUtil.queryTree(rawExpr);
    return new Expr(
        {
            usedRef,
            assertDelegate,
        },
        queryTree
    );
}