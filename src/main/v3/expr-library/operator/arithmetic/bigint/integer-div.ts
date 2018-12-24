import * as sd from "schema-decorator";
import {RawExpr, RawExprUtil} from "../../../../raw-expr";
import {Expr} from "../../../../expr";
import {ColumnRefUtil} from "../../../../column-ref";
import * as dataType from "../../../../data-type";

//https://dev.mysql.com/doc/refman/8.0/en/arithmetic-functions.html#operator_div
export function integerDiv<
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
        //1 DIV 0 === NULL
        assertDelegate : sd.AssertDelegate<bigint|null>,
    }>
) {
    return new Expr(
        {
            usedRef : ColumnRefUtil.intersect(
                RawExprUtil.usedRef(left),
                RawExprUtil.usedRef(right)
            ),
            assertDelegate : sd.nullable(dataType.bigint()),
        },
        [
            RawExprUtil.queryTree(left),
            "DIV",
            RawExprUtil.queryTree(right),
        ]
    );
}