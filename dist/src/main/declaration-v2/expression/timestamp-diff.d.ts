import { RawExpr, RawExprUtil } from "../raw-expr";
import { Expr } from "../expr";
import { ColumnReferencesUtil } from "../column-references";
import { NumericIntervalUnit } from "./interval-unit";
export declare function timestampDiff<FirstT extends RawExpr<Date>, SecondT extends RawExpr<Date>>(intervalUnit: NumericIntervalUnit, first: FirstT, second: SecondT): (Expr<ColumnReferencesUtil.Merge<RawExprUtil.UsedReferences<FirstT>, RawExprUtil.UsedReferences<SecondT>>, number>);
//# sourceMappingURL=timestamp-diff.d.ts.map