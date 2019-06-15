import * as sd from "type-mapping";
import { Expr } from "../../../expr";
import { RawExpr } from "../../../raw-expr";
import { RawExprUtil } from "../../../raw-expr";
export declare function castAsDateTime<RawExprT extends RawExpr<Date | string>>(rawExpr: RawExprT, fractionalSecondPrecision?: 0 | 1 | 2 | 3): (Expr<{
    usedRef: RawExprUtil.UsedRef<RawExprT>;
    assertDelegate: sd.SafeMapper<Date>;
}>);
