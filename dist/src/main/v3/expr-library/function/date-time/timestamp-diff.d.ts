import * as sd from "schema-decorator";
import { Expr } from "../../../expr";
import { RawExpr } from "../../../raw-expr";
import { RawExprUtil } from "../../../raw-expr";
import { TemporalUnit } from "../../constant";
export declare function timestampDiff<FromT extends RawExpr<Date>, ToT extends RawExpr<Date>>(temporalUnit: TemporalUnit, from: FromT, to: ToT): (Expr<{
    usedColumns: (RawExprUtil.UsedColumns<FromT>[number] | RawExprUtil.UsedColumns<ToT>[number])[];
    assertDelegate: sd.AssertDelegate<bigint>;
}>);
