import * as sd from "schema-decorator";
import { Expr } from "../../../expr";
import { RawExpr } from "../../../raw-expr";
import { RawExprUtil } from "../../../raw-expr";
import { TranscodingName } from "./transcoding-name";
export declare function convert<RawExprT extends RawExpr<string>>(rawExpr: RawExprT, transcodingName: TranscodingName): (Expr<{
    usedRef: RawExprUtil.UsedRef<RawExprT>;
    assertDelegate: sd.AssertDelegate<string>;
}>);
//# sourceMappingURL=convert.d.ts.map