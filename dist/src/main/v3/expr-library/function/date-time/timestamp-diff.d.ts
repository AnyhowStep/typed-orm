import * as sd from "type-mapping";
import { Expr } from "../../../expr";
import { RawExpr } from "../../../raw-expr";
import { RawExprUtil } from "../../../raw-expr";
import { TemporalUnit } from "../../constant";
export declare function timestampDiff<FromT extends RawExpr<Date>, ToT extends RawExpr<Date>>(temporalUnit: TemporalUnit, from: FromT, to: ToT): (Expr<{
    usedRef: (RawExprUtil.UsedRef<FromT> & RawExprUtil.UsedRef<ToT>);
    assertDelegate: sd.SafeMapper<bigint>;
}>);
