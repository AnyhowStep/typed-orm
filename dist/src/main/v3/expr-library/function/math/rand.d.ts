import * as sd from "schema-decorator";
import { Expr } from "../../../expr";
import { RawExpr } from "../../../raw-expr";
import { RawExprUtil } from "../../../raw-expr";
export declare function rand(): (Expr<{
    usedRef: {};
    assertDelegate: sd.AssertDelegate<number>;
}>);
export declare function rand<RawExprT extends RawExpr<bigint>>(seed: RawExprT): (Expr<{
    usedRef: RawExprUtil.UsedRef<RawExprT>;
    assertDelegate: sd.AssertDelegate<number>;
}>);
//# sourceMappingURL=rand.d.ts.map