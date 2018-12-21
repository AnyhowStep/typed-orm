import * as sd from "schema-decorator";
import { RawExpr, RawExprUtil } from "../../../raw-expr";
import { Expr } from "../../../expr";
import { ColumnRefUtil } from "../../../column-ref";
export declare function numericDiv<LeftT extends RawExpr<number | bigint>, RightT extends RawExpr<RawExprUtil.TypeOf<LeftT>>>(left: LeftT, right: RightT): (Expr<{
    usedRef: ColumnRefUtil.Intersect<RawExprUtil.UsedRef<LeftT>, RawExprUtil.UsedRef<RightT>>;
    assertDelegate: sd.AssertDelegate<number | null>;
}>);
//# sourceMappingURL=numeric-div.d.ts.map