import * as sd from "schema-decorator";
import { RawExpr, RawExprUtil } from "../../../../raw-expr";
import { Expr } from "../../../../expr";
export declare function bigIntMul<ArrT extends RawExpr<bigint>[]>(...arr: ArrT): (Expr<{
    usedColumns: RawExprUtil.Array.UsedColumns<ArrT>;
    assertDelegate: sd.AssertDelegate<bigint>;
}>);
