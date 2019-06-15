import * as sd from "type-mapping";
import { Expr } from "../../../expr";
import { RawExpr } from "../../../raw-expr";
import { RawExprUtil } from "../../../raw-expr";
import { Locale } from "../../constant";
export declare function format<X extends RawExpr<number>, DecimalPlacesT extends RawExpr<number>>(x: X, decimalPlaces: DecimalPlacesT): (Expr<{
    usedRef: (RawExprUtil.UsedRef<X> & RawExprUtil.UsedRef<DecimalPlacesT>);
    assertDelegate: sd.SafeMapper<string>;
}>);
export declare function format<X extends RawExpr<number>, DecimalPlacesT extends RawExpr<number>, LocaleT extends RawExpr<Locale>>(x: X, decimalPlaces: DecimalPlacesT, locale: LocaleT): (Expr<{
    usedRef: (RawExprUtil.UsedRef<X> & RawExprUtil.UsedRef<DecimalPlacesT> & RawExprUtil.UsedRef<LocaleT>);
    assertDelegate: sd.SafeMapper<string>;
}>);
