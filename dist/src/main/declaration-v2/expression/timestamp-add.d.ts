import { RawExpr, RawExprUtil } from "../raw-expr";
import { Expr } from "../expr";
import { ColumnReferencesUtil } from "../column-references";
import { NumericIntervalUnit } from "./interval-unit";
export declare function timestampAdd<IntervalT extends RawExpr<number>, DateTimeT extends RawExpr<Date>>(intervalUnit: NumericIntervalUnit, interval: IntervalT, dateTime: DateTimeT): (Expr<ColumnReferencesUtil.Merge<RawExprUtil.UsedReferences<IntervalT>, RawExprUtil.UsedReferences<DateTimeT>>, Date>);
//# sourceMappingURL=timestamp-add.d.ts.map