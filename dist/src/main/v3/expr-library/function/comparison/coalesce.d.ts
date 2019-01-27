import { Expr } from "../../../expr";
import { RawExpr } from "../../../raw-expr";
import { RawExprUtil } from "../../../raw-expr";
import { PrimitiveExpr } from "../../../primitive-expr";
export declare function coalesce<Arg0 extends RawExpr<PrimitiveExpr>, Arg1 extends RawExpr<RawExprUtil.TypeOf<Arg0>>>(arg0: Arg0, arg1: Arg1): (Expr<{
    usedColumns: (RawExprUtil.UsedColumns<Arg0>[number] | RawExprUtil.UsedColumns<Arg1>[number])[];
    assertDelegate: RawExprUtil.AssertDelegate<Exclude<RawExprUtil.TypeOf<Arg0>, null> | Arg1>;
}>);
export declare function coalesce<Arg0 extends RawExpr<PrimitiveExpr>, Arg1 extends RawExpr<RawExprUtil.TypeOf<Arg0>>, Arg2 extends RawExpr<RawExprUtil.TypeOf<Arg0>>>(arg0: Arg0, arg1: Arg1, arg2: Arg2): (Expr<{
    usedColumns: (RawExprUtil.UsedColumns<Arg0>[number] | RawExprUtil.UsedColumns<Arg1>[number] | RawExprUtil.UsedColumns<Arg2>[number])[];
    assertDelegate: RawExprUtil.AssertDelegate<Exclude<RawExprUtil.TypeOf<Arg0>, null> | Exclude<RawExprUtil.TypeOf<Arg1>, null> | Arg2>;
}>);
export declare function coalesce<Arg0 extends RawExpr<PrimitiveExpr>, Arg1 extends RawExpr<RawExprUtil.TypeOf<Arg0>>, Arg2 extends RawExpr<RawExprUtil.TypeOf<Arg0>>, Arg3 extends RawExpr<RawExprUtil.TypeOf<Arg0>>>(arg0: Arg0, arg1: Arg1, arg2: Arg2, arg3: Arg3): (Expr<{
    usedColumns: (RawExprUtil.UsedColumns<Arg0>[number] | RawExprUtil.UsedColumns<Arg1>[number] | RawExprUtil.UsedColumns<Arg2>[number] | RawExprUtil.UsedColumns<Arg3>[number])[];
    assertDelegate: RawExprUtil.AssertDelegate<Exclude<RawExprUtil.TypeOf<Arg0>, null> | Exclude<RawExprUtil.TypeOf<Arg1>, null> | Exclude<RawExprUtil.TypeOf<Arg2>, null> | Arg3>;
}>);
