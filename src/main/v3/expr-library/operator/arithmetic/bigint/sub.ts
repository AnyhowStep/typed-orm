import * as sd from "type-mapping";
import {RawExpr, RawExprUtil} from "../../../../raw-expr";
import {Expr} from "../../../../expr";
import {QueryTreeArray} from "../../../../query-tree";
import * as dataType from "../../../../data-type";
import {castAsSignedInteger} from "../../../function";

//https://dev.mysql.com/doc/refman/8.0/en/arithmetic-functions.html#operator_minus
export function bigIntSub<ArrT extends RawExpr<bigint>[]> (
    ...arr : ArrT
) : (
    Expr<{
        usedRef : RawExprUtil.IntersectUsedRefTuple<ArrT>,
        assertDelegate : sd.SafeMapper<bigint>,
    }>
) {
    const usedRef = RawExprUtil.intersectUsedRefTuple(...arr);
    const queryTree : QueryTreeArray = [];

    for (let rawExpr of arr) {
        if (queryTree.length > 0) {
            queryTree.push("-");
        }
        queryTree.push(RawExprUtil.queryTree(rawExpr));
    }
    if (queryTree.length == 0) {
        //By convention, the subtraction of zero numbers is zero
        return new Expr(
            {
                usedRef : usedRef,
                assertDelegate : dataType.bigint(),
            },
            RawExprUtil.queryTree(0)
        );
    } else {
        return new Expr(
            {
                usedRef : usedRef,
                assertDelegate : dataType.bigint(),
            },
            queryTree
        );
    }
}
/**
 * We cannot always perform integer subtraction naively in SQL.
 *
 * Error #1690 - BIGINT UNSIGNED value is out of range
 * ```sql
 * SELECT CAST(1 AS UNSIGNED INTEGER) - CAST(2 AS SIGNED INTEGER)
 * ```
 *
 * -----
 *
 * If either `x` or `y` are `UNSIGNED`,
 * we need to cast both to `SIGNED` before performing subtraction,
 * if we want to allow negative numbers.
 *
 * ```sql
 * SELECT CAST(x AS SIGNED INTEGER) - CAST(y AS SIGNED INTEGER)
 * ```
 *
 * @param arr
 */
export function bigIntSubAsSignedInteger<ArrT extends RawExpr<bigint>[]> (
    ...arr : ArrT
) : (
    Expr<{
        usedRef : RawExprUtil.IntersectUsedRefTuple<ArrT>,
        assertDelegate : sd.SafeMapper<bigint>,
    }>
) {
    return bigIntSub(
        ...arr.map(x => castAsSignedInteger(x))
    ) as Expr<{
        usedRef : RawExprUtil.IntersectUsedRefTuple<ArrT>,
        assertDelegate : sd.SafeMapper<bigint>,
    }>;
}