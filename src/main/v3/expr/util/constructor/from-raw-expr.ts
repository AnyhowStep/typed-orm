import {Expr} from "../../expr";
import {RawExpr, RawExprUtil} from "../../../raw-expr";
import {PrimitiveExpr} from "../../../primitive-expr";

export type FromRawExpr<RawExprT extends RawExpr<PrimitiveExpr>> = (
    Expr<{
        usedColumns : RawExprUtil.UsedColumns<RawExprT>,
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
    const usedColumns = RawExprUtil.usedColumns(rawExpr);
    const assertDelegate = RawExprUtil.assertDelegate(rawExpr);
    const queryTree = RawExprUtil.queryTree(rawExpr);
    return new Expr(
        {
            usedColumns,
            assertDelegate,
        },
        queryTree
    );
}