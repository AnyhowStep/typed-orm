import * as sd from "schema-decorator";
import { RawExpr, RawExprUtil } from "../../../raw-expr";
import { Expr } from "../../../expr";
export declare function xor<LeftT extends RawExpr<boolean>, RightT extends RawExpr<boolean>>(left: LeftT, right: RightT): (Expr<{
    usedColumns: (RawExprUtil.UsedColumns<LeftT>[number] | RawExprUtil.UsedColumns<RightT>[number])[];
    assertDelegate: sd.AssertDelegate<boolean>;
}>);
