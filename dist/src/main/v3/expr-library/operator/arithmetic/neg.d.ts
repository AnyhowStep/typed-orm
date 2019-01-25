import * as sd from "schema-decorator";
import { RawExpr, RawExprUtil } from "../../../raw-expr";
import { Expr } from "../../../expr";
export declare function neg<RawExprT extends RawExpr<number>>(rawExpr: RawExprT): (Expr<{
    usedRef: RawExprUtil.UsedRef<RawExprT>;
    assertDelegate: sd.AssertDelegate<number>;
}>);
