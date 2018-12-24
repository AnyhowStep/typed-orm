import { Query } from "../../query";
import { AfterFromClause } from "../predicate";
import { ColumnRefUtil } from "../../../column-ref";
import { RawExpr, RawExprUtil } from "../../../raw-expr";
import { ColumnUtil } from "../../../column";
import { IAnonymousTypedExpr } from "../../../expr";
export declare type HavingDelegate<QueryT extends AfterFromClause> = ((columns: ColumnRefUtil.ToConvenient<ColumnRefUtil.FromQuery<QueryT>>, query: QueryT) => RawExpr<boolean>);
export declare type Having<QueryT extends AfterFromClause> = (Query<{
    readonly _distinct: QueryT["_distinct"];
    readonly _sqlCalcFoundRows: QueryT["_sqlCalcFoundRows"];
    readonly _joins: QueryT["_joins"];
    readonly _parentJoins: QueryT["_parentJoins"];
    readonly _selects: QueryT["_selects"];
    readonly _where: QueryT["_where"];
    readonly _grouped: QueryT["_grouped"];
    readonly _having: IAnonymousTypedExpr<boolean>;
    readonly _orders: QueryT["_orders"];
    readonly _limit: QueryT["_limit"];
    readonly _unions: QueryT["_unions"];
    readonly _unionOrders: QueryT["_unionOrders"];
    readonly _unionLimit: QueryT["_unionLimit"];
    readonly _mapDelegate: QueryT["_mapDelegate"];
}>);
export declare type AssertValidHavingDelegate<QueryT extends AfterFromClause, HavingDelegateT extends HavingDelegate<QueryT>> = (HavingDelegateT & (ColumnRefUtil.FromQuery<QueryT> extends RawExprUtil.UsedRef<ReturnType<HavingDelegateT>> ? unknown : ["HAVING expression contains some invalid columns; the following are not allowed:", Exclude<ColumnUtil.FromColumnRef<RawExprUtil.UsedRef<ReturnType<HavingDelegateT>>>, ColumnUtil.FromColumnRef<ColumnRefUtil.FromQuery<QueryT>>>]));
export declare function having<QueryT extends AfterFromClause, HavingDelegateT extends HavingDelegate<QueryT>>(query: QueryT, delegate: AssertValidHavingDelegate<QueryT, HavingDelegateT>): Having<QueryT>;
//# sourceMappingURL=and-having.d.ts.map