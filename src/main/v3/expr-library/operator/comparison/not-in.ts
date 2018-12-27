import * as sd from "schema-decorator";
import {Expr} from "../../../expr";
import {RawExpr} from "../../../raw-expr";
import {RawExprUtil} from "../../../raw-expr";
import {NonNullPrimitiveExpr} from "../../../primitive-expr";
import {Tuple} from "../../../tuple";
import {FunctionCall} from "../../../query-tree";
import * as dataType from "../../../data-type";

//https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#function_not-in
export function notIn<
    LeftT extends RawExpr<NonNullPrimitiveExpr>,
    Arg0 extends RawExpr<RawExprUtil.TypeOf<LeftT>>,
    Args extends Tuple<RawExpr<RawExprUtil.TypeOf<LeftT>>>
>(
    left : LeftT,
    arg0 : Arg0,
    ...args : Args
) : (
    //Not an exact typing but, in general, should work
    Expr<{
        usedRef : (
            RawExprUtil.UsedRef<LeftT> &
            RawExprUtil.UsedRef<Arg0> &
            RawExprUtil.IntersectUsedRefTuple<Args>
        ),
        assertDelegate : sd.AssertDelegate<boolean>,
    }>
) {
    return new Expr(
        {
            usedRef : RawExprUtil.intersectUsedRefTuple(left, arg0, ...(args as any)),
            assertDelegate : dataType.boolean(),
        },
        [
            RawExprUtil.queryTree(left),
            new FunctionCall(
                "NOT IN",
                [
                    RawExprUtil.queryTree(arg0),
                    ...args.map(RawExprUtil.queryTree),
                ]
            ),
        ]
    ) as any;
}