import * as sd from "schema-decorator";
import { Expr } from "../../../expr";
import { RawExpr } from "../../../raw-expr";
import { RawExprUtil } from "../../../raw-expr";
export declare function fromBase64<StrExprT extends RawExpr<string>>(strExpr: StrExprT): (Expr<{
    usedColumns: RawExprUtil.UsedColumns<StrExprT>;
    assertDelegate: sd.AssertDelegate<string>;
}>);
