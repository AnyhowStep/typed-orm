import * as sd from "schema-decorator";
import { RawExpr, RawExprUtil } from "../../../raw-expr";
import { Expr } from "../../../expr";
export declare function div<LeftT extends RawExpr<number>, RightT extends RawExpr<number>>(left: LeftT, right: RightT): (Expr<{
    usedColumns: (RawExprUtil.UsedColumns<LeftT>[number] | RawExprUtil.UsedColumns<RightT>[number])[];
    assertDelegate: sd.AssertDelegate<number | null>;
}>);
