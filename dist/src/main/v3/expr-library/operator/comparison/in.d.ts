import * as sd from "schema-decorator";
import { Expr } from "../../../expr";
import { RawExpr } from "../../../raw-expr";
import { RawExprUtil } from "../../../raw-expr";
import { NonNullPrimitiveExpr } from "../../../primitive-expr";
import { Tuple } from "../../../tuple";
declare function In<LeftT extends RawExpr<NonNullPrimitiveExpr>, Arg0 extends RawExpr<RawExprUtil.TypeOf<LeftT>>, Args extends Tuple<RawExpr<RawExprUtil.TypeOf<LeftT>>>>(left: LeftT, arg0: Arg0, ...args: Args): (Expr<{
    usedRef: (RawExprUtil.UsedRef<LeftT> & RawExprUtil.UsedRef<Arg0> & RawExprUtil.IntersectUsedRefTuple<Args>);
    assertDelegate: sd.AssertDelegate<boolean>;
}>);
export { In as in };
//# sourceMappingURL=in.d.ts.map