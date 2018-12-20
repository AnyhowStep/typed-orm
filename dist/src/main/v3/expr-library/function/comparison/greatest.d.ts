import { Expr } from "../../../expr";
import { RawExpr } from "../../../raw-expr";
import { RawExprUtil } from "../../../raw-expr";
import { NonNullPrimitiveExpr } from "../../../primitive-expr";
import { Tuple } from "../../../tuple";
export declare function greatest<Arg0 extends RawExpr<NonNullPrimitiveExpr>, Arg1 extends RawExpr<RawExprUtil.TypeOf<Arg0>>, Args extends Tuple<RawExpr<RawExprUtil.TypeOf<Arg0>>>>(arg0: Arg0, arg1: Arg1, ...args: Args): (Expr<{
    usedRef: (RawExprUtil.UsedRef<Arg0> & RawExprUtil.UsedRef<Arg1> & RawExprUtil.IntersectUsedRefTuple<Args>);
    assertDelegate: RawExprUtil.AssertDelegate<Arg0>;
}>);
//# sourceMappingURL=greatest.d.ts.map