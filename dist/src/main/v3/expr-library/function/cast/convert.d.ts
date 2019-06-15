import * as sd from "type-mapping";
import { Expr } from "../../../expr";
import { RawExpr } from "../../../raw-expr";
import { RawExprUtil } from "../../../raw-expr";
import { TranscodingName } from "../../constant";
export declare function convert<RawExprT extends RawExpr<string>>(rawExpr: RawExprT, transcodingName: TranscodingName): (Expr<{
    usedRef: RawExprUtil.UsedRef<RawExprT>;
    assertDelegate: sd.SafeMapper<string>;
}>);
