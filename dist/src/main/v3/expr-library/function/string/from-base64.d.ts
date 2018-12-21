import * as sd from "schema-decorator";
import { Expr } from "../../../expr";
import { RawExpr } from "../../../raw-expr";
import { RawExprUtil } from "../../../raw-expr";
export declare function fromBase64<StrExprT extends RawExpr<string>>(strExpr: StrExprT): (Expr<{
    usedRef: RawExprUtil.UsedRef<StrExprT>;
    assertDelegate: sd.AssertDelegate<string>;
}>);
//# sourceMappingURL=from-base64.d.ts.map