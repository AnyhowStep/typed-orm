import * as sd from "schema-decorator";
import {RawExpr, RawExprUtil} from "../../../raw-expr";
import {Expr} from "../../../expr";
import {ColumnRefUtil} from "../../../column-ref";
import * as dataType from "../../../data-type";

export function xor<
    LeftT extends RawExpr<boolean>,
    RightT extends RawExpr<boolean>
> (
    left : LeftT,
    right : RightT
) : (
    Expr<{
        usedRef : ColumnRefUtil.Intersect<
            RawExprUtil.UsedRef<LeftT>,
            RawExprUtil.UsedRef<RightT>
        >,
        assertDelegate : sd.AssertDelegate<boolean>,
    }>
) {
    return new Expr(
        {
            usedRef : ColumnRefUtil.intersect(
                RawExprUtil.usedRef(left),
                RawExprUtil.usedRef(right)
            ),
            assertDelegate : dataType.boolean(),
        },
        [
            RawExprUtil.queryTree(left),
            "XOR",
            RawExprUtil.queryTree(right),
        ]
    );
}