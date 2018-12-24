import * as sd from "schema-decorator";
import {RawExpr, RawExprUtil} from "../../../../raw-expr";
import {Expr} from "../../../../expr";
import {ColumnRefUtil} from "../../../../column-ref";
import * as dataType from "../../../../data-type";

//https://dev.mysql.com/doc/refman/8.0/en/arithmetic-functions.html#operator_mod
export function bigIntMod<
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
        //1 % 0 === NULL
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
            "%",
            RawExprUtil.queryTree(right),
        ]
    );
}