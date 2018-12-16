import { Query } from "../../query";
import { AfterFromClause } from "../predicate";
import { ColumnRefUtil } from "../../../column-ref";
import { RawExpr, RawExprUtil } from "../../../raw-expr";
import { ColumnUtil } from "../../../column";
import { IAnonymousTypedExpr } from "../../../expr";
export declare type AndHavingDelegate<QueryT extends AfterFromClause> = ((columns: ColumnRefUtil.ToConvenient<ColumnRefUtil.FromQuery<QueryT>>, query: QueryT) => RawExpr<boolean>);
export declare type AndHaving<QueryT extends AfterFromClause> = (Query<{
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
export declare type AssertValidAndHavingDelegate<QueryT extends AfterFromClause, AndHavingDelegateT extends AndHavingDelegate<QueryT>> = (AndHavingDelegateT & (ColumnRefUtil.FromQuery<QueryT> extends RawExprUtil.UsedRef<ReturnType<AndHavingDelegateT>> ? unknown : ["HAVING expression contains some invalid columns; the following are not allowed:", Exclude<ColumnUtil.FromColumnRef<RawExprUtil.UsedRef<ReturnType<AndHavingDelegateT>>>, ColumnUtil.FromColumnRef<ColumnRefUtil.FromQuery<QueryT>>>]));
export declare function andHaving<QueryT extends AfterFromClause, AndHavingDelegateT extends AndHavingDelegate<QueryT>>(query: QueryT, delegate: AssertValidAndHavingDelegate<QueryT, AndHavingDelegateT>): AndHaving<QueryT>;
//# sourceMappingURL=and-having.d.ts.map