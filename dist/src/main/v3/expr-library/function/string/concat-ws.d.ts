import * as sd from "schema-decorator";
import { Expr } from "../../../expr";
import { RawExpr } from "../../../raw-expr";
import { RawExprUtil } from "../../../raw-expr";
import { Tuple } from "../../../tuple";
export declare function concatWs<SeparatorT extends RawExpr<string>, Arg0 extends RawExpr<string>, Args extends Tuple<RawExpr<string>>>(separator: SeparatorT, arg0: Arg0, ...args: Args): (Expr<{
    usedRef: (RawExprUtil.UsedRef<SeparatorT> & RawExprUtil.UsedRef<Arg0> & RawExprUtil.IntersectUsedRefTuple<Args>);
    assertDelegate: sd.AssertDelegate<string>;
}>);
//# sourceMappingURL=concat-ws.d.ts.map