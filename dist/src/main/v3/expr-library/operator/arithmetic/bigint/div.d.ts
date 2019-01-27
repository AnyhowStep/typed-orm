import * as sd from "schema-decorator";
import { RawExpr, RawExprUtil } from "../../../../raw-expr";
import { Expr } from "../../../../expr";
export declare function bigIntDiv<LeftT extends RawExpr<bigint>, RightT extends RawExpr<bigint>>(left: LeftT, right: RightT): (Expr<{
    usedColumns: (RawExprUtil.UsedColumns<LeftT>[number] | RawExprUtil.UsedColumns<RightT>[number])[];
    assertDelegate: sd.AssertDelegate<number | null>;
}>);
