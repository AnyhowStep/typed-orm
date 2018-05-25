import { Expr } from "../expr";
import { AnyRawExpr, RawExprUtil } from "../raw-expr";
import { ColumnReferencesUtil } from "../column-references";
export declare const COUNT_ALL: Expr<{}, number>;
export declare function count<RawT extends AnyRawExpr>(raw: RawT): (Expr<RawExprUtil.UsedReferences<RawT>, number>);
export declare function countDistinct<LeftT extends AnyRawExpr, RightT extends AnyRawExpr>(left: LeftT, ...rightArr: RightT[]): (Expr<ColumnReferencesUtil.Merge<RawExprUtil.UsedReferences<LeftT>, RawExprUtil.UsedReferences<RightT>>, number>);
