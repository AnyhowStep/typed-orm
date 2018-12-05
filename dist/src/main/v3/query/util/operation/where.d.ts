import { Query } from "../../query";
import { AfterFromClause } from "../predicate";
import { ColumnRefUtil } from "../../../column-ref";
import { RawExpr, RawExprUtil } from "../../../raw-expr";
export declare type WhereDelegate<QueryT extends AfterFromClause> = ((columns: ColumnRefUtil.ToConvenient<ColumnRefUtil.FromQuery<QueryT>>, query: QueryT) => RawExpr<boolean>);
export declare function where<QueryT extends AfterFromClause, WhereDelegateT extends WhereDelegate<QueryT>>(query: QueryT, delegate: (WhereDelegateT & (ColumnRefUtil.FromQuery<QueryT> extends RawExprUtil.UsedRef<ReturnType<WhereDelegateT>> ? unknown : ["WHERE expression contains some invalid columns; the following are not allowed:", Exclude<ColumnRefUtil.ToUnion<RawExprUtil.UsedRef<ReturnType<WhereDelegateT>>>, ColumnRefUtil.ToUnion<ColumnRefUtil.FromQuery<QueryT>>>] | void))): Query<QueryT>;
//# sourceMappingURL=where.d.ts.map