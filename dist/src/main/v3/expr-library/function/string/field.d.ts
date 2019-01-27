import * as sd from "schema-decorator";
import { Expr } from "../../../expr";
import { RawExpr } from "../../../raw-expr";
import { RawExprUtil } from "../../../raw-expr";
export declare function field<NeedleT extends RawExpr<string>, Arg0 extends RawExpr<string>, Args extends RawExpr<string>[]>(needle: NeedleT, arg0: Arg0, ...args: Args): (Expr<{
    usedColumns: (RawExprUtil.UsedColumns<NeedleT>[number] | RawExprUtil.UsedColumns<Arg0>[number] | RawExprUtil.Array.UsedColumns<Args>[number])[];
    assertDelegate: sd.AssertDelegate<number>;
}>);
