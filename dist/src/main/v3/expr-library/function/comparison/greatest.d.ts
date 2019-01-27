import { Expr } from "../../../expr";
import { RawExpr } from "../../../raw-expr";
import { RawExprUtil } from "../../../raw-expr";
import { NonNullPrimitiveExpr } from "../../../primitive-expr";
export declare function greatest<Arg0 extends RawExpr<NonNullPrimitiveExpr>, Arg1 extends RawExpr<RawExprUtil.TypeOf<Arg0>>, Args extends RawExpr<RawExprUtil.TypeOf<Arg0>>[]>(arg0: Arg0, arg1: Arg1, ...args: Args): (Expr<{
    usedColumns: (RawExprUtil.UsedColumns<Arg0>[number] | RawExprUtil.UsedColumns<Arg1>[number] | RawExprUtil.Array.UsedColumns<Args>[number])[];
    assertDelegate: RawExprUtil.AssertDelegate<Arg0>;
}>);
