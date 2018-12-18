import * as sd from "schema-decorator";
import {Expr} from "../../../expr";
import {RawExpr} from "../../../raw-expr";
import {PrimitiveExpr} from "../../../primitive-expr";
import {RawExprUtil} from "../../../raw-expr";
import {ColumnRefUtil} from "../../../column-ref";


/*
    NULL-safe equal.
    This operator performs an equality comparison like the = operator,
    but returns
    1 rather than NULL if both operands are NULL, and
    0 rather than NULL if one operand is NULL.

    https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#operator_equal-to
*/
export function nullSafeEq<
    LeftT extends RawExpr<PrimitiveExpr>,
    RightT extends RawExpr<RawExprUtil.TypeOf<LeftT>|null>
>(
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
            assertDelegate : sd.numberToBoolean(),
        },
        [
            RawExprUtil.queryTree(left),
            "<=>",
            RawExprUtil.queryTree(right),
        ]
    );
}