import * as sd from "schema-decorator";
import { RawExpr, RawExprUtil } from "../../../raw-expr";
import { Expr } from "../../../expr";
import { Tuple } from "../../../tuple";
export declare function and<ArrT extends Tuple<RawExpr<boolean>>>(...arr: ArrT): (Expr<{
    usedRef: RawExprUtil.IntersectUsedRefTuple<ArrT>;
    assertDelegate: sd.AssertDelegate<boolean>;
}>);
//# sourceMappingURL=and.d.ts.map