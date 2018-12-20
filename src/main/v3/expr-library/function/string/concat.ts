import * as sd from "schema-decorator";
import {Expr} from "../../../expr";
import {RawExpr} from "../../../raw-expr";
import {RawExprUtil} from "../../../raw-expr";
import {FunctionCall} from "../../../query-tree";
import {Tuple} from "../../../tuple";

//https://dev.mysql.com/doc/refman/8.0/en/string-functions.html#function_concat
//TODO Add support for Buffer
//If all arguments are nonbinary strings, the result is a nonbinary string.
//If the arguments include any binary strings, the result is a binary string.
export function concat<
    Arg0 extends RawExpr<string>,
    Args extends Tuple<RawExpr<string>>,
>(
    arg0 : Arg0,
    ...args : Args
) : (
    Expr<{
        usedRef : (
            RawExprUtil.UsedRef<Arg0> &
            RawExprUtil.IntersectUsedRefTuple<Args>
        ),
        assertDelegate : sd.AssertDelegate<string>,
    }>
) {
    const result = new Expr(
        {
            usedRef : RawExprUtil.intersectUsedRefTuple(
                arg0,
                ...(args as any)
            ),
            assertDelegate : sd.string(),
        },
        new FunctionCall(
            "CONCAT",
            [
                RawExprUtil.queryTree(arg0),
                ...args.map(RawExprUtil.queryTree)
            ]
        )
    );
    return result as any;
}