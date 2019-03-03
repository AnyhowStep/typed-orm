import * as sd from "schema-decorator";
import { RawExpr, RawExprUtil } from "../../../raw-expr";
import { Expr } from "../../../expr";
export declare function or<ArrT extends RawExpr<boolean>[]>(...arr: ArrT): (Expr<{
    usedRef: RawExprUtil.IntersectUsedRefTuple<ArrT>;
    assertDelegate: sd.AssertDelegate<boolean>;
}>);
