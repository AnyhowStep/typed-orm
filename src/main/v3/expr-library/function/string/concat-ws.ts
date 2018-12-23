import * as sd from "schema-decorator";
import {Expr} from "../../../expr";
import {RawExpr} from "../../../raw-expr";
import {RawExprUtil} from "../../../raw-expr";
import {FunctionCall} from "../../../query-tree";
import {Tuple} from "../../../tuple";

//https://dev.mysql.com/doc/refman/8.0/en/string-functions.html#function_concat-ws
//TODO-FEATURE Add support for Buffer
//If all arguments are nonbinary strings, the result is a nonbinary string.
//If the arguments include any binary strings, the result is a binary string.
export function concatWs<
    SeparatorT extends RawExpr<string>,
    Arg0 extends RawExpr<string>,
    Args extends Tuple<RawExpr<string>>,
>(
    separator : SeparatorT,
    arg0 : Arg0,
    ...args : Args
) : (
    Expr<{
        usedRef : (
            RawExprUtil.UsedRef<SeparatorT> &
            RawExprUtil.UsedRef<Arg0> &
            RawExprUtil.IntersectUsedRefTuple<Args>
        ),
        assertDelegate : sd.AssertDelegate<string>,
    }>
) {
    const result = new Expr(
        {
            usedRef : RawExprUtil.intersectUsedRefTuple(
                separator,
                arg0,
                ...(args as any)
            ),
            assertDelegate : sd.string(),
        },
        new FunctionCall(
            "CONCAT_WS",
            [
                RawExprUtil.queryTree(separator),
                RawExprUtil.queryTree(arg0),
                ...args.map(RawExprUtil.queryTree)
            ]
        )
    );
    return result as any;
}