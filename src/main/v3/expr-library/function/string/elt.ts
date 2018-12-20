import * as sd from "schema-decorator";
import {Expr} from "../../../expr";
import {RawExpr} from "../../../raw-expr";
import {RawExprUtil} from "../../../raw-expr";
import {FunctionCall} from "../../../query-tree";
import {Tuple} from "../../../tuple";

//https://dev.mysql.com/doc/refman/8.0/en/string-functions.html#function_elt
export function elt<
    N extends RawExpr<number>,
    Arg0 extends RawExpr<string>,
    Args extends Tuple<RawExpr<string>>,
>(
    n : N,
    arg0 : Arg0,
    ...args : Args
) : (
    Expr<{
        usedRef : (
            RawExprUtil.UsedRef<N> &
            RawExprUtil.UsedRef<Arg0> &
            RawExprUtil.IntersectUsedRefTuple<Args>
        ),
        //Returns NULL if N is less than 1 or greater than the number of arguments.
        assertDelegate : sd.AssertDelegate<string|null>,
    }>
) {
    const result = new Expr(
        {
            usedRef : RawExprUtil.intersectUsedRefTuple(
                n,
                arg0,
                ...(args as any)
            ),
            assertDelegate : sd.nullable(sd.string()),
        },
        new FunctionCall(
            "ELT",
            [
                RawExprUtil.queryTree(n),
                RawExprUtil.queryTree(arg0),
                ...args.map(RawExprUtil.queryTree)
            ]
        )
    );
    return result as any;
}