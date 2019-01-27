import * as sd from "schema-decorator";
import { Expr } from "../../../expr";
import { RawExpr } from "../../../raw-expr";
import { RawExprUtil } from "../../../raw-expr";
import { Locale } from "../../constant";
export declare function format<X extends RawExpr<number>, DecimalPlacesT extends RawExpr<number>>(x: X, decimalPlaces: DecimalPlacesT): (Expr<{
    usedColumns: (RawExprUtil.UsedColumns<X>[number] | RawExprUtil.UsedColumns<DecimalPlacesT>[number])[];
    assertDelegate: sd.AssertDelegate<string>;
}>);
export declare function format<X extends RawExpr<number>, DecimalPlacesT extends RawExpr<number>, LocaleT extends RawExpr<Locale>>(x: X, decimalPlaces: DecimalPlacesT, locale: LocaleT): (Expr<{
    usedColumns: (RawExprUtil.UsedColumns<X>[number] | RawExprUtil.UsedColumns<DecimalPlacesT>[number] | RawExprUtil.UsedColumns<LocaleT>[number])[];
    assertDelegate: sd.AssertDelegate<string>;
}>);
