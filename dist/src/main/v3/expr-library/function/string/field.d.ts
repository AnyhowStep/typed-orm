import * as sd from "schema-decorator";
import { Expr } from "../../../expr";
import { RawExpr } from "../../../raw-expr";
import { RawExprUtil } from "../../../raw-expr";
import { Tuple } from "../../../tuple";
export declare function field<NeedleT extends RawExpr<string>, Arg0 extends RawExpr<string>, Args extends Tuple<RawExpr<string>>>(needle: NeedleT, arg0: Arg0, ...args: Args): (Expr<{
    usedRef: (RawExprUtil.UsedRef<NeedleT> & RawExprUtil.UsedRef<Arg0> & RawExprUtil.IntersectUsedRefTuple<Args>);
    assertDelegate: sd.AssertDelegate<number>;
}>);
