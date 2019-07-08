import * as sd from "type-mapping";
import {Expr} from "../../../expr";
import {RawExpr} from "../../../raw-expr";
import {RawExprUtil} from "../../../raw-expr";
import {FunctionCall} from "../../../query-tree";
//import {Tuple} from "../../../tuple";

/**
 * https://dev.mysql.com/doc/refman/8.0/en/string-functions.html#function_concat-ws
 *
 * + If all arguments are nonbinary strings, the result is a nonbinary string.
 * + If the arguments include any binary strings, the result is a binary string.
 *
 * @param separator
 * @param arg0
 * @param args
 * @todo Add support for `Buffer`
 */
export function concatWs<
    SeparatorT extends RawExpr<string>,
    Arg0 extends RawExpr<string|null>,
    //Args extends Tuple<RawExpr<string|null>>
    Args extends RawExpr<string|null>[],
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
        assertDelegate : sd.SafeMapper<string>,
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
/**
 * Like `concatWs()` but throws an error if zero `args` is given.
 *
 * @param separator
 * @param args
 */
export function unsafeConcatWs<
    SeparatorT extends RawExpr<string>,
    Args extends RawExpr<string|null>[],
>(
    separator : SeparatorT,
    ...args : Args
) : (
    Expr<{
        usedRef : (
            RawExprUtil.UsedRef<SeparatorT> &
            RawExprUtil.IntersectUsedRefTuple<Args>
        ),
        assertDelegate : sd.SafeMapper<string>,
    }>
) {
    if (args.length == 0) {
        throw new Error(`Cannot CONCAT_WS() zero arguments`);
    }
    const result = new Expr(
        {
            usedRef : RawExprUtil.intersectUsedRefTuple(
                separator,
                ...(args as any)
            ),
            assertDelegate : sd.string(),
        },
        new FunctionCall(
            "CONCAT_WS",
            [
                RawExprUtil.queryTree(separator),
                ...args.map(RawExprUtil.queryTree)
            ]
        )
    );
    return result as any;
}