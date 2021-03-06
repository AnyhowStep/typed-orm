import * as sd from "type-mapping";
import { Expr } from "../../../expr";
import { RawExpr } from "../../../raw-expr";
import { RawExprUtil } from "../../../raw-expr";
import { Tuple } from "../../../tuple";
export declare function elt<N extends RawExpr<number>, Arg0 extends RawExpr<string>, Args extends Tuple<RawExpr<string>>>(n: N, arg0: Arg0, ...args: Args): (Expr<{
    usedRef: (RawExprUtil.UsedRef<N> & RawExprUtil.UsedRef<Arg0> & RawExprUtil.IntersectUsedRefTuple<Args>);
    assertDelegate: sd.SafeMapper<string | null>;
}>);
