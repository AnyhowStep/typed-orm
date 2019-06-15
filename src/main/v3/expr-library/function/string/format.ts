import * as sd from "type-mapping";
import {Expr} from "../../../expr";
import {RawExpr} from "../../../raw-expr";
import {RawExprUtil} from "../../../raw-expr";
import {FunctionCall} from "../../../query-tree";
import {Locale} from "../../constant";

//https://dev.mysql.com/doc/refman/8.0/en/string-functions.html#function_format
//What a terrible function name
export function format<
    X extends RawExpr<number>,
    DecimalPlacesT extends RawExpr<number>
>(
    x : X,
    decimalPlaces : DecimalPlacesT
) : (
    Expr<{
        usedRef : (
            RawExprUtil.UsedRef<X> &
            RawExprUtil.UsedRef<DecimalPlacesT>
        ),
        assertDelegate : sd.SafeMapper<string>,
    }>
);
export function format<
    X extends RawExpr<number>,
    DecimalPlacesT extends RawExpr<number>,
    LocaleT extends RawExpr<Locale>
>(
    x : X,
    decimalPlaces : DecimalPlacesT,
    locale : LocaleT
) : (
    Expr<{
        usedRef : (
            RawExprUtil.UsedRef<X> &
            RawExprUtil.UsedRef<DecimalPlacesT> &
            RawExprUtil.UsedRef<LocaleT>
        ),
        assertDelegate : sd.SafeMapper<string>,
    }>
);
export function format (...args : RawExpr<any>[]) {
    const result = new Expr(
        {
            usedRef : RawExprUtil.intersectUsedRefTuple(
                ...(args as any)
            ),
            assertDelegate : sd.string(),
        },
        new FunctionCall(
            "FORMAT",
            [
                ...args.map(RawExprUtil.queryTree)
            ]
        )
    );
    return result as any;
}