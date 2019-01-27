import * as sd from "schema-decorator";
import { RawExpr, RawExprUtil } from "../../../../raw-expr";
import { Expr } from "../../../../expr";
export declare function bigIntNeg<RawExprT extends RawExpr<bigint>>(rawExpr: RawExprT): (Expr<{
    usedColumns: RawExprUtil.UsedColumns<RawExprT>;
    assertDelegate: sd.AssertDelegate<bigint>;
}>);
