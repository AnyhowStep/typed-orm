import * as sd from "schema-decorator";
import { Expr } from "../../../expr";
import { RawExpr } from "../../../raw-expr";
import { RawExprUtil } from "../../../raw-expr";
export declare function interval<Arg0 extends RawExpr<number | bigint>, Arg1 extends RawExpr<RawExprUtil.TypeOf<Arg0>>, Args extends RawExpr<RawExprUtil.TypeOf<Arg0>>[]>(arg0: Arg0, arg1: Arg1, ...args: Args): (Expr<{
    usedColumns: (RawExprUtil.UsedColumns<Arg0>[number] | RawExprUtil.UsedColumns<Arg1>[number] | RawExprUtil.Array.UsedColumns<Args>[number])[];
    assertDelegate: sd.AssertDelegate<bigint>;
}>);
