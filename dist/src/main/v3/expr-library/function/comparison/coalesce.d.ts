import { Expr } from "../../../expr";
import { RawExpr } from "../../../raw-expr";
import { RawExprUtil } from "../../../raw-expr";
import { PrimitiveExpr } from "../../../primitive-expr";
export declare function coalesce<Arg0 extends RawExpr<PrimitiveExpr>, Arg1 extends RawExpr<RawExprUtil.TypeOf<Arg0>>>(arg0: Arg0, arg1: Arg1): (Expr<{
    usedRef: RawExprUtil.IntersectUsedRefTuple<[Arg0, Arg1]>;
    assertDelegate: RawExprUtil.AssertDelegate<Exclude<RawExprUtil.TypeOf<Arg0>, null> | Arg1>;
}>);
export declare function coalesce<Arg0 extends RawExpr<PrimitiveExpr>, Arg1 extends RawExpr<RawExprUtil.TypeOf<Arg0>>, Arg2 extends RawExpr<RawExprUtil.TypeOf<Arg0>>>(arg0: Arg0, arg1: Arg1, arg2: Arg2): (Expr<{
    usedRef: RawExprUtil.IntersectUsedRefTuple<[Arg0, Arg1, Arg2]>;
    assertDelegate: RawExprUtil.AssertDelegate<Exclude<RawExprUtil.TypeOf<Arg0>, null> | Exclude<RawExprUtil.TypeOf<Arg1>, null> | Arg2>;
}>);
export declare function coalesce<Arg0 extends RawExpr<PrimitiveExpr>, Arg1 extends RawExpr<RawExprUtil.TypeOf<Arg0>>, Arg2 extends RawExpr<RawExprUtil.TypeOf<Arg0>>, Arg3 extends RawExpr<RawExprUtil.TypeOf<Arg0>>>(arg0: Arg0, arg1: Arg1, arg2: Arg2, arg3: Arg3): (Expr<{
    usedRef: RawExprUtil.IntersectUsedRefTuple<[Arg0, Arg1, Arg2, Arg3]>;
    assertDelegate: RawExprUtil.AssertDelegate<Exclude<RawExprUtil.TypeOf<Arg0>, null> | Exclude<RawExprUtil.TypeOf<Arg1>, null> | Exclude<RawExprUtil.TypeOf<Arg2>, null> | Arg3>;
}>);
