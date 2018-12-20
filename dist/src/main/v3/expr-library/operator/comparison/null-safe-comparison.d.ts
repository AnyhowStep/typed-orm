import * as sd from "schema-decorator";
import { Expr } from "../../../expr";
import { RawExpr } from "../../../raw-expr";
import { PrimitiveExpr } from "../../../primitive-expr";
import { RawExprUtil } from "../../../raw-expr";
import { ColumnRefUtil } from "../../../column-ref";
export declare type NullSafeComparison = (<LeftT extends RawExpr<PrimitiveExpr>, RightT extends RawExpr<RawExprUtil.TypeOf<LeftT> | null>>(left: LeftT, right: RightT) => (Expr<{
    usedRef: ColumnRefUtil.Intersect<RawExprUtil.UsedRef<LeftT>, RawExprUtil.UsedRef<RightT>>;
    assertDelegate: sd.AssertDelegate<boolean>;
}>));
export declare function nullSafeComparison(operator: string): NullSafeComparison;
//# sourceMappingURL=null-safe-comparison.d.ts.map