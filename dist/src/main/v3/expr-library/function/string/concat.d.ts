import * as sd from "type-mapping";
import { Expr } from "../../../expr";
import { RawExpr } from "../../../raw-expr";
import { RawExprUtil } from "../../../raw-expr";
import { Tuple } from "../../../tuple";
export declare function concat<Arg0 extends RawExpr<string>, Args extends Tuple<RawExpr<string>>>(arg0: Arg0, ...args: Args): (Expr<{
    usedRef: (RawExprUtil.UsedRef<Arg0> & RawExprUtil.IntersectUsedRefTuple<Args>);
    assertDelegate: sd.SafeMapper<string>;
}>);
