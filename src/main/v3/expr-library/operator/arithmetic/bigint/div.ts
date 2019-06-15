import * as sd from "type-mapping";
import {RawExpr, RawExprUtil} from "../../../../raw-expr";
import {Expr} from "../../../../expr";
import {ColumnRefUtil} from "../../../../column-ref";
import * as dataType from "../../../../data-type";

//https://dev.mysql.com/doc/refman/8.0/en/arithmetic-functions.html#operator_divide
export function bigIntDiv<
    LeftT extends RawExpr<bigint>,
    RightT extends RawExpr<bigint>
> (
    left : LeftT,
    right : RightT
) : (
    Expr<{
        usedRef : ColumnRefUtil.Intersect<
            RawExprUtil.UsedRef<LeftT>,
            RawExprUtil.UsedRef<RightT>
        >,
        //1 / 0 === NULL
        //CAST(5 AS UNSIGNED) / CAST(2 AS UNSIGNED) === 2.5
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