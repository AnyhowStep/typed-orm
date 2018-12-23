import * as sd from "schema-decorator";
import { RawExpr, RawExprUtil } from "../../../../raw-expr";
import { Expr } from "../../../../expr";
import { Tuple } from "../../../../tuple";
export declare function bigIntAdd<ArrT extends Tuple<RawExpr<bigint>>>(...arr: ArrT): (Expr<{
    usedRef: RawExprUtil.IntersectUsedRefTuple<ArrT>;
    assertDelegate: sd.AssertDelegate<bigint>;
}>);
//# sourceMappingURL=add.d.ts.map