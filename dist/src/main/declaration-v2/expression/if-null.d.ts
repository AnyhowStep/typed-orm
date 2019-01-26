import { AnyRawExpr, RawExprUtil } from "../raw-expr";
import { Expr } from "../expr";
import { ColumnReferencesUtil } from "../column-references";
export declare function ifNull<LeftT extends AnyRawExpr, RightT extends AnyRawExpr>(left: LeftT, right: RightT): (Expr<ColumnReferencesUtil.Merge<RawExprUtil.UsedReferences<LeftT>, RawExprUtil.UsedReferences<RightT>>, Exclude<RawExprUtil.Type<LeftT>, null> | RawExprUtil.Type<RightT>>);
//# sourceMappingURL=if-null.d.ts.map