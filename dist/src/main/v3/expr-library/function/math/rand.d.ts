import * as sd from "schema-decorator";
import { Expr } from "../../../expr";
import { RawExpr } from "../../../raw-expr";
import { RawExprUtil } from "../../../raw-expr";
export declare function rand(): (Expr<{
    usedColumns: never[];
    assertDelegate: sd.AssertDelegate<number>;
}>);
export declare function rand<RawExprT extends RawExpr<bigint>>(seed: RawExprT): (Expr<{
    usedColumns: RawExprUtil.UsedColumns<RawExprT>;
    assertDelegate: sd.AssertDelegate<number>;
}>);
