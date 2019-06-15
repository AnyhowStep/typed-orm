import * as sd from "type-mapping";
import { Expr } from "../../../expr";
import { RawExpr } from "../../../raw-expr";
import { RawExprUtil } from "../../../raw-expr";
import { Tuple } from "../../../tuple";
import { TranscodingName } from "../../constant";
export declare function toChar<Arg0 extends RawExpr<number>, Args extends Tuple<RawExpr<number>>>(arg0: Arg0, ...args: Args): (Expr<{
    usedRef: (RawExprUtil.UsedRef<Arg0> & RawExprUtil.IntersectUsedRefTuple<Args>);
    assertDelegate: sd.SafeMapper<Buffer>;
}> & {
    using: (transcodingName: TranscodingName) => (Expr<{
        usedRef: (RawExprUtil.UsedRef<Arg0> & RawExprUtil.IntersectUsedRefTuple<Args>);
        assertDelegate: sd.SafeMapper<string>;
    }>);
});
