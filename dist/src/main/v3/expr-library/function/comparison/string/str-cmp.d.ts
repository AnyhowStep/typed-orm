import * as sd from "schema-decorator";
import { Expr } from "../../../../expr";
import { RawExpr } from "../../../../raw-expr";
import { RawExprUtil } from "../../../../raw-expr";
export declare function strCmp<LeftT extends RawExpr<string>, RightT extends RawExpr<string>>(left: LeftT, right: RightT): (Expr<{
    usedColumns: (RawExprUtil.UsedColumns<LeftT>[number] | RawExprUtil.UsedColumns<RightT>[number])[];
    assertDelegate: sd.AssertDelegate<0 | 1 | -1>;
}>);
