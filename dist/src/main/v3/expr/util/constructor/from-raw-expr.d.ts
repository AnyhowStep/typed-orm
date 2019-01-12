import { Expr } from "../../expr";
import { RawExpr, RawExprUtil } from "../../../raw-expr";
import { PrimitiveExpr } from "../../../primitive-expr";
export declare type FromRawExpr<RawExprT extends RawExpr<PrimitiveExpr>> = (Expr<{
    usedRef: RawExprUtil.UsedRef<RawExprT>;
    assertDelegate: RawExprUtil.AssertDelegate<RawExprT>;
}>);
export declare function fromRawExpr<RawExprT extends RawExpr<PrimitiveExpr>>(rawExpr: RawExprT): FromRawExpr<RawExprT>;
//# sourceMappingURL=from-raw-expr.d.ts.map