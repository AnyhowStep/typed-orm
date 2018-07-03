import { RawExpr, AnyRawExpr, RawExprUtil } from "../raw-expr";
import { ColumnReferencesUtil } from "../column-references";
import { Expr } from "../expr";
export declare function ifTrue<ConditionT extends RawExpr<boolean>, TrueExprT extends AnyRawExpr, FalseExprT extends AnyRawExpr>(condition: ConditionT, trueExpr: TrueExprT, falseExpr: FalseExprT): (Expr<ColumnReferencesUtil.Merge<RawExprUtil.UsedReferences<ConditionT>, ColumnReferencesUtil.Merge<RawExprUtil.UsedReferences<TrueExprT>, RawExprUtil.UsedReferences<FalseExprT>>>, RawExprUtil.Type<TrueExprT> | RawExprUtil.Type<FalseExprT>>);
