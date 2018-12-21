import * as sd from "schema-decorator";
import { RawExpr, RawExprUtil } from "../../../../raw-expr";
import { Expr } from "../../../../expr";
import { ColumnRefUtil } from "../../../../column-ref";
export declare function bigIntDiv<LeftT extends RawExpr<bigint>, RightT extends RawExpr<bigint>>(left: LeftT, right: RightT): (Expr<{
    usedRef: ColumnRefUtil.Intersect<RawExprUtil.UsedRef<LeftT>, RawExprUtil.UsedRef<RightT>>;
    assertDelegate: sd.AssertDelegate<number | null>;
}>);
//# sourceMappingURL=div.d.ts.map