import * as sd from "schema-decorator";
import { Expr } from "../../../expr";
import { RawExpr } from "../../../raw-expr";
import { RawExprUtil } from "../../../raw-expr";
export declare function castAsDouble<RawExprT extends RawExpr<bigint>>(rawExpr: RawExprT): (Expr<{
    usedColumns: RawExprUtil.UsedColumns<RawExprT>;
    assertDelegate: sd.AssertDelegate<number>;
}>);
