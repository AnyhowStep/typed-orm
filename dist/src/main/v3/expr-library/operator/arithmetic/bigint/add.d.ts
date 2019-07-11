import * as sd from "type-mapping";
import { RawExpr, RawExprUtil } from "../../../../raw-expr";
import { Expr } from "../../../../expr";
export declare function bigIntAdd<ArrT extends RawExpr<bigint>[]>(...arr: ArrT): (Expr<{
    usedRef: RawExprUtil.IntersectUsedRefTuple<ArrT>;
    assertDelegate: sd.SafeMapper<bigint>;
}>);
/**
 * We cannot always perform integer addition naively in SQL.
 *
 * Error #1690 - BIGINT UNSIGNED value is out of range
 * ```sql
 * SELECT CAST(1 AS UNSIGNED INTEGER) + CAST(-2 AS SIGNED INTEGER)
 * ```
 *
 * -----
 *
 * If either `x` or `y` are `UNSIGNED`,
 * we need to cast both to `SIGNED` before performing addition,
 * if we want to allow negative numbers.
 *
 * ```sql
 * SELECT CAST(x AS SIGNED INTEGER) + CAST(y AS SIGNED INTEGER)
 * ```
 *
 * @param arr
 */
export declare function bigIntAddAsSignedInteger<ArrT extends RawExpr<bigint>[]>(...arr: ArrT): (Expr<{
    usedRef: RawExprUtil.IntersectUsedRefTuple<ArrT>;
    assertDelegate: sd.SafeMapper<bigint>;
}>);
