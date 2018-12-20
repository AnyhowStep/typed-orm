import * as sd from "schema-decorator";
import {Expr} from "../../../expr";
import {RawExpr} from "../../../raw-expr";
import {RawExprUtil} from "../../../raw-expr";
import {FunctionCall} from "../../../query-tree";
import {Tuple} from "../../../tuple";

//https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#function_interval
export function interval<
    Arg0 extends RawExpr<number|bigint>,
    Arg1 extends RawExpr<RawExprUtil.TypeOf<Arg0>>,
    Args extends Tuple<RawExpr<RawExprUtil.TypeOf<Arg0>>>
>(
    arg0 : Arg0,
    arg1 : Arg1,
    ...args : Args
) : (
    //Not an exact typing but, in general, should work
    Expr<{
        usedRef : (
            RawExprUtil.UsedRef<Arg0> &
            RawExprUtil.UsedRef<Arg1> &
            RawExprUtil.IntersectUsedRefTuple<Args>
        ),
        assertDelegate : sd.AssertDelegate<number>,
    }>
) {
    return new Expr(
        {
            usedRef : RawExprUtil.intersectUsedRefTuple(arg0, arg1, ...(args as any)),
            assertDelegate : sd.naturalNumber(),
        },
        new FunctionCall(
            "INTERVAL",
            [
                RawExprUtil.queryTree(arg0),
                RawExprUtil.queryTree(arg1),
                ...args.map(RawExprUtil.queryTree),
            ]
        )
    ) as any;
}