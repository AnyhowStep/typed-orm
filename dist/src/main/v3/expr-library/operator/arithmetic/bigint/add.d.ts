import * as sd from "type-mapping";
import { RawExpr, RawExprUtil } from "../../../../raw-expr";
import { Expr } from "../../../../expr";
import { Tuple } from "../../../../tuple";
export declare function bigIntAdd<ArrT extends Tuple<RawExpr<bigint>>>(...arr: ArrT): (Expr<{
    usedRef: RawExprUtil.IntersectUsedRefTuple<ArrT>;
    assertDelegate: sd.SafeMapper<bigint>;
}>);
