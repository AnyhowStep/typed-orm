import {RawExpr, RawExprUtil} from "../../../raw-expr";
import {PrimitiveExpr} from "../../../primitive-expr";
import {Expr} from "../../../expr";
import * as exprLib from "../../../expr-library";

export type Coalesce<
    QueryT extends RawExpr<PrimitiveExpr>,
    DefaultT extends RawExpr<RawExprUtil.TypeOf<QueryT>>
> = (
    Expr<{
        usedRef : RawExprUtil.IntersectUsedRefTuple<
            [QueryT, DefaultT]
        >,
        assertDelegate : RawExprUtil.AssertDelegate<
            Exclude<RawExprUtil.TypeOf<QueryT>, null>|
            DefaultT
        >,
    }>
);

export function coalesce<
    QueryT extends RawExpr<PrimitiveExpr>,
    DefaultT extends RawExpr<RawExprUtil.TypeOf<QueryT>>
> (
    query : QueryT,
    defaultExpr : DefaultT
) : Coalesce<QueryT, DefaultT> {
    return exprLib.coalesce(
        query,
        defaultExpr
    );
}
