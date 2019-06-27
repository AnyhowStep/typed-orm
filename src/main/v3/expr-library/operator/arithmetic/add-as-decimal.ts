import * as sd from "type-mapping";
import {RawExpr, RawExprUtil} from "../../../raw-expr";
import {Expr} from "../../../expr";
import {Tuple} from "../../../tuple";
import {QueryTreeArray} from "../../../query-tree";
import * as dataType from "../../../data-type";
import { __internalCastAsDecimal } from "../../function";

/**
 * https://dev.mysql.com/doc/refman/8.0/en/arithmetic-functions.html#operator_plus
 *
 * ```ts
 * const QST = 0.0975;
 * const GST = 0.05;
 * console.log(QST + GST);
 * ```
 *
 * Were you expecting `0.1475`?
 *
 * The result is `0.14750000000000002`.
 *
 * Another example of double behaving in unintuitive ways.
 *
 * -----
 *
 * The solution is to convert the values to a `DECIMAL(M, D)` type, add those,
 * then convert the result back to a `double`.
 *
 * -----
 *
 * https://dev.mysql.com/doc/refman/5.7/en/precision-math-decimal-characteristics.html
 *
 * + Casts `rawExpr` into `DECIMAL(maxDigitCount, fractionalDigitCount)`
 * + Where `fractionalDigitCount <= maxDigitCount`
 * + Where `maxDigitCount` is [1, 65]
 * + Where `fractionalDigitCount` is [0, 30] && <= `maxDigitCount`
 */
export function addAsDecimal<ArrT extends Tuple<RawExpr<number>>> (
    decimal : {
        maxDigitCount : number,
        fractionalDigitCount : number,
    },
    ...arr : ArrT
) : (
    Expr<{
        usedRef : RawExprUtil.IntersectUsedRefTuple<ArrT>,
        assertDelegate : sd.SafeMapper<number>,
    }>
) {
    const decimalArr = arr.map(rawExpr => __internalCastAsDecimal(rawExpr, decimal.maxDigitCount, decimal.fractionalDigitCount));
    const usedRef = RawExprUtil.intersectUsedRefTuple(...arr);
    const queryTree : QueryTreeArray = [];

    for (let rawExpr of decimalArr) {
        if (queryTree.length > 0) {
            queryTree.push("+");
        }
        queryTree.push(RawExprUtil.queryTree(rawExpr));
    }
    if (queryTree.length == 0) {
        //By convention, adding zero numbers is zero.
        return new Expr(
            {
                usedRef : usedRef,
                assertDelegate : dataType.double(),
            },
            RawExprUtil.queryTree(0)
        );
    } else {
        //Adapter from `castAsDouble()`
        queryTree.push("+");
        queryTree.push("0e0");
        return new Expr(
            {
                usedRef : usedRef,
                assertDelegate : dataType.double(),
            },
            queryTree
        );
    }
}