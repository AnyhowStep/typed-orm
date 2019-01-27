import * as sd from "schema-decorator";
import { Expr } from "../../../expr";
import { RawExpr } from "../../../raw-expr";
import { RawExprUtil } from "../../../raw-expr";
export declare function castAsDateTime<RawExprT extends RawExpr<Date | string>>(rawExpr: RawExprT, fractionalSecondPrecision?: 0 | 1 | 2 | 3): (Expr<{
    usedColumns: RawExprUtil.UsedColumns<RawExprT>;
    assertDelegate: sd.AssertDelegate<bigint>;
}>);
