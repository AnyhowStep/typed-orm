import * as sd from "schema-decorator";
import { Expr } from "../../../expr";
import { RawExpr } from "../../../raw-expr";
import { RawExprUtil } from "../../../raw-expr";
import { TranscodingName } from "../../constant";
export declare function convert<RawExprT extends RawExpr<string>>(rawExpr: RawExprT, transcodingName: TranscodingName): (Expr<{
    usedColumns: RawExprUtil.UsedColumns<RawExprT>;
    assertDelegate: sd.AssertDelegate<string>;
}>);
