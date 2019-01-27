import * as sd from "schema-decorator";
import { Expr } from "../../../expr";
import { RawExpr } from "../../../raw-expr";
import { RawExprUtil } from "../../../raw-expr";
import { PrimitiveExpr } from "../../../primitive-expr";
export declare function max<RawExprT extends RawExpr<PrimitiveExpr>>(rawExpr: RawExprT): (Expr<{
    usedColumns: RawExprUtil.UsedColumns<RawExprT>;
    assertDelegate: sd.AssertDelegate<RawExprUtil.TypeOf<RawExprT> | null>;
}>);
