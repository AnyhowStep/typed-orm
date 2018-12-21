import * as sd from "schema-decorator";
import { Expr } from "../../../expr";
import { RawExpr } from "../../../raw-expr";
import { RawExprUtil } from "../../../raw-expr";
import { TemporalUnit } from "../../constant";
import * as dataType from "../../../data-type";
export declare function timestampDiff<FromT extends RawExpr<dataType.MySqlDateTime>, ToT extends RawExpr<dataType.MySqlDateTime>>(temporalUnit: TemporalUnit, from: FromT, to: ToT): (Expr<{
    usedRef: (RawExprUtil.UsedRef<FromT> & RawExprUtil.UsedRef<ToT>);
    assertDelegate: sd.AssertDelegate<bigint>;
}>);
//# sourceMappingURL=timestamp-diff.d.ts.map