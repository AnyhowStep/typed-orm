/// <reference types="node" />
import * as sd from "schema-decorator";
import { Expr } from "../../../expr";
import { RawExpr } from "../../../raw-expr";
import { RawExprUtil } from "../../../raw-expr";
import { Tuple } from "../../../tuple";
import { TranscodingName } from "../cast";
export declare function char<Arg0 extends RawExpr<number>, Args extends Tuple<RawExpr<number>>>(arg0: Arg0, ...args: Args): (Expr<{
    usedRef: (RawExprUtil.UsedRef<Arg0> & RawExprUtil.IntersectUsedRefTuple<Args>);
    assertDelegate: sd.AssertDelegate<Buffer>;
}> & {
    using: (transcodingName: TranscodingName) => (Expr<{
        usedRef: (RawExprUtil.UsedRef<Arg0> & RawExprUtil.IntersectUsedRefTuple<Args>);
        assertDelegate: sd.AssertDelegate<string>;
    }>);
});
//# sourceMappingURL=char.d.ts.map