import * as sd from "schema-decorator";
import {RawExpr, RawExprUtil} from "../../../raw-expr";
import {Expr} from "../../../expr";
import {ColumnRefUtil} from "../../../column-ref";

//https://dev.mysql.com/doc/refman/8.0/en/arithmetic-functions.html#operator_divide
export function div<
    LeftT extends RawExpr<number>,
    RightT extends RawExpr<number>
> (
    left : LeftT,
    right : RightT
) : (
    Expr<{
        usedRef : ColumnRefUtil.Intersect<
            RawExprUtil.UsedRef<LeftT>,
            RawExprUtil.UsedRef<RightT>
        >,
        assertDelegate : sd.AssertDelegate<number|null>,
    }>
) {
    return new Expr(
        {
            usedRef : ColumnRefUtil.intersect(
                RawExprUtil.usedRef(left),
                RawExprUtil.usedRef(right)
            ),
            assertDelegate : sd.nullable(sd.number()),
        },
        [
            RawExprUtil.queryTree(left),
            "/",
            RawExprUtil.queryTree(right),
        ]
    );
}