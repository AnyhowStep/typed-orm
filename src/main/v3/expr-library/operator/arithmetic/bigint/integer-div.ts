import * as sd from "type-mapping";
import {RawExpr, RawExprUtil} from "../../../../raw-expr";
import {Expr} from "../../../../expr";
import {ColumnRefUtil} from "../../../../column-ref";
import * as dataType from "../../../../data-type";
import {castAsSignedInteger} from "../../../function";

//https://dev.mysql.com/doc/refman/8.0/en/arithmetic-functions.html#operator_div
export function integerDiv<
    LeftT extends RawExpr<bigint>,
    RightT extends RawExpr<bigint>
> (
    left : LeftT,
    right : RightT
) : (
    Expr<{
        usedRef : ColumnRefUtil.Intersect<
            RawExprUtil.UsedRef<LeftT>,
            RawExprUtil.UsedRef<RightT>
        >,
        //1 DIV 0 === NULL
        assertDelegate : sd.SafeMapper<bigint|null>,
    }>
) {
    return new Expr(
        {
            usedRef : ColumnRefUtil.intersect(
                RawExprUtil.usedRef(left),
                RawExprUtil.usedRef(right)
            ),
            assertDelegate : sd.orNull(dataType.bigint()),
        },
        [
            RawExprUtil.queryTree(left),
            "DIV",
            RawExprUtil.queryTree(right),
        ]
    );
}
/**
 * We cannot always perform integer division naively in SQL.
 *
 * Error #1690 - BIGINT UNSIGNED value is out of range
 * ```sql
 * SELECT CAST(2 AS UNSIGNED INTEGER) DIV CAST(-1 AS SIGNED INTEGER)
 * ```
 *
 * -----
 *
 * If either `x` or `y` are `UNSIGNED`,
 * we need to cast both to `SIGNED` before performing integer division,
 * if we want to allow negative numbers.
 *
 * ```sql
 * SELECT CAST(x AS SIGNED INTEGER) DIV CAST(y AS SIGNED INTEGER)
 * ```
 *
 * @param arr
 */
export function integerDivAsSignedInteger<
    LeftT extends RawExpr<bigint>,
    RightT extends RawExpr<bigint>
> (
    left : LeftT,
    right : RightT
) : (
    Expr<{
        usedRef : ColumnRefUtil.Intersect<
            RawExprUtil.UsedRef<LeftT>,
            RawExprUtil.UsedRef<RightT>
        >,
        //1 DIV 0 === NULL
        assertDelegate : sd.SafeMapper<bigint|null>,
    }>
) {
    return integerDiv(
        castAsSignedInteger(left),
        castAsSignedInteger(right)
    );
}