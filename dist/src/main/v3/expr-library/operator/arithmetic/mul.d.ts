import * as sd from "schema-decorator";
import { RawExpr, RawExprUtil } from "../../../raw-expr";
import { Expr } from "../../../expr";
import { Tuple } from "../../../tuple";
export declare function mul<ArrT extends Tuple<RawExpr<number>>>(...arr: ArrT): (Expr<{
    usedRef: RawExprUtil.IntersectUsedRefTuple<ArrT>;
    assertDelegate: sd.AssertDelegate<number>;
}>);
