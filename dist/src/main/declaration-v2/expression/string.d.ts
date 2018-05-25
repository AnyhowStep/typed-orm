import { Expr } from "../expr";
import { RawExpr, RawExprUtil } from "../raw-expr";
import { ColumnReferencesUtil } from "../column-references";
export declare function concat<LeftT extends RawExpr<boolean | number | string | Date>, RightT extends RawExpr<boolean | number | string | Date>>(left: LeftT, ...rightArr: RightT[]): (Expr<ColumnReferencesUtil.Merge<RawExprUtil.UsedReferences<LeftT>, RawExprUtil.UsedReferences<RightT>>, string>);
