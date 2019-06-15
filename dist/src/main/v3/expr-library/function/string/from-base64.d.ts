import * as sd from "type-mapping";
import { Expr } from "../../../expr";
import { RawExpr } from "../../../raw-expr";
import { RawExprUtil } from "../../../raw-expr";
export declare function fromBase64<StrExprT extends RawExpr<string>>(strExpr: StrExprT): (Expr<{
    usedRef: RawExprUtil.UsedRef<StrExprT>;
    assertDelegate: sd.SafeMapper<string>;
}>);
