import * as sd from "schema-decorator";
import { Expr } from "../../../../expr";
import { RawExpr } from "../../../../raw-expr";
import { RawExprUtil } from "../../../../raw-expr";
export declare function bigIntSum<RawExprT extends RawExpr<bigint | null>>(rawExpr: RawExprT): (Expr<{
    usedRef: RawExprUtil.UsedRef<RawExprT>;
    assertDelegate: sd.AssertDelegate<bigint | null>;
}>);
