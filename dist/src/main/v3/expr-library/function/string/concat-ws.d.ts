import * as sd from "type-mapping";
import { Expr } from "../../../expr";
import { RawExpr } from "../../../raw-expr";
import { RawExprUtil } from "../../../raw-expr";
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
export declare function concatWs<SeparatorT extends RawExpr<string>, Arg0 extends RawExpr<string | null>, Args extends RawExpr<string | null>[]>(separator: SeparatorT, arg0: Arg0, ...args: Args): (Expr<{
    usedRef: (RawExprUtil.UsedRef<SeparatorT> & RawExprUtil.UsedRef<Arg0> & RawExprUtil.IntersectUsedRefTuple<Args>);
    assertDelegate: sd.SafeMapper<string>;
}>);
/**
 * Like `concatWs()` but throws an error if zero `args` is given.
 *
 * @param separator
 * @param args
 */
export declare function unsafeConcatWs<SeparatorT extends RawExpr<string>, Args extends RawExpr<string | null>[]>(separator: SeparatorT, ...args: Args): (Expr<{
    usedRef: (RawExprUtil.UsedRef<SeparatorT> & RawExprUtil.IntersectUsedRefTuple<Args>);
    assertDelegate: sd.SafeMapper<string>;
}>);
