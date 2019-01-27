import * as sd from "schema-decorator";
import { RawExpr, RawExprUtil } from "../../../raw-expr";
import { Expr } from "../../../expr";
export declare function add<ArrT extends RawExpr<number>[]>(...arr: ArrT): (Expr<{
    usedColumns: RawExprUtil.Array.UsedColumns<ArrT>;
    assertDelegate: sd.AssertDelegate<number>;
}>);
