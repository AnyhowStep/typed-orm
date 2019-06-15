import * as sd from "type-mapping";
import {RawExpr, RawExprUtil} from "../../../raw-expr";
import {Expr} from "../../../expr";
import {ColumnRefUtil} from "../../../column-ref";
import * as dataType from "../../../data-type";

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
        assertDelegate : sd.SafeMapper<number|null>,
    }>
) {
    return new Expr(
        {
            usedRef : ColumnRefUtil.intersect(
                RawExprUtil.usedRef(left),
                RawExprUtil.usedRef(right)
            ),
            assertDelegate : sd.orNull(dataType.double()),
        },
        [
            RawExprUtil.queryTree(left),
            "/",
            RawExprUtil.queryTree(right),
        ]
    );
}