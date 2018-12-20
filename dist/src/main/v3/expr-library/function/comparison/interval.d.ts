import * as sd from "schema-decorator";
import { Expr } from "../../../expr";
import { RawExpr } from "../../../raw-expr";
import { RawExprUtil } from "../../../raw-expr";
import { Tuple } from "../../../tuple";
export declare function interval<Arg0 extends RawExpr<number | bigint>, Arg1 extends RawExpr<RawExprUtil.TypeOf<Arg0>>, Args extends Tuple<RawExpr<RawExprUtil.TypeOf<Arg0>>>>(arg0: Arg0, arg1: Arg1, ...args: Args): (Expr<{
    usedRef: (RawExprUtil.UsedRef<Arg0> & RawExprUtil.UsedRef<Arg1> & RawExprUtil.IntersectUsedRefTuple<Args>);
    assertDelegate: sd.AssertDelegate<number>;
}>);
//# sourceMappingURL=interval.d.ts.map