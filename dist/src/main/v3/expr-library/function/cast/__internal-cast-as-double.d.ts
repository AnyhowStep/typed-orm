import * as sd from "type-mapping";
import { Expr } from "../../../expr";
import { RawExpr } from "../../../raw-expr";
import { RawExprUtil } from "../../../raw-expr";
/**
 * We don't have `CAST(x AS DOUBLE)` so we use a hack.
 *
 * `(x + 0e0)` will give us a `DOUBLE`
 *
 * -----
 *
 * Should not be called directly, in general.
 *
 * @param rawExpr
 */
export declare function __internalCastAsDouble<RawExprT extends RawExpr<bigint | string>>(rawExpr: RawExprT): (Expr<{
    usedRef: RawExprUtil.UsedRef<RawExprT>;
    assertDelegate: sd.SafeMapper<number>;
}>);
