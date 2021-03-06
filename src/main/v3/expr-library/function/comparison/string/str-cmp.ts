import * as sd from "type-mapping";
import {Expr} from "../../../../expr";
import {RawExpr} from "../../../../raw-expr";
import {RawExprUtil} from "../../../../raw-expr";
import {ColumnRefUtil} from "../../../../column-ref";
import {FunctionCall} from "../../../../query-tree";

//https://dev.mysql.com/doc/refman/8.0/en/string-comparison-functions.html#function_strcmp
//C calls it strcmp()
//But "proper" camelCase says it should be strCmp()
export function strCmp<
    LeftT extends RawExpr<string>,
    RightT extends RawExpr<string>
>(
    left : LeftT,
    right : RightT
) : (
    Expr<{
        usedRef : ColumnRefUtil.Intersect<
            RawExprUtil.UsedRef<LeftT>,
            RawExprUtil.UsedRef<RightT>
        >,
        assertDelegate : sd.SafeMapper<0|1|-1>,
    }>
) {
    const result = new Expr(
        {
            usedRef : ColumnRefUtil.intersect(
                RawExprUtil.usedRef(left),
                RawExprUtil.usedRef(right)
            ),
            assertDelegate : sd.literal(0, 1, -1),
        },
        new FunctionCall(
            "STRCMP",
            [
                RawExprUtil.queryTree(left),
                RawExprUtil.queryTree(right),
            ]
        )
    );
    return result;
}