import * as sd from "schema-decorator";
import { Expr } from "../../../expr";
import { RawExpr } from "../../../raw-expr";
import { RawExprUtil } from "../../../raw-expr";
import { TemporalUnit } from "../../constant";
export declare function timestampAdd<IntervalT extends RawExpr<bigint>, DateTimeT extends RawExpr<Date>>(temporalUnit: TemporalUnit, interval: IntervalT, dateTime: DateTimeT): (Expr<{
    usedRef: (RawExprUtil.UsedRef<IntervalT> & RawExprUtil.UsedRef<DateTimeT>);
    assertDelegate: sd.AssertDelegate<Date>;
}>);
