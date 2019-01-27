import { Query } from "../../query";
import { AfterFromClause } from "../predicate";
import { ColumnRefUtil } from "../../../column-ref";
import { IExpr } from "../../../expr";
import { ColumnUtil, IColumn } from "../../../column";
import { NonEmptyTuple } from "../../../tuple";
import { RawOrder, Order, OrderUtil, SortDirection } from "../../../order";
import { ToNeverIfAllFieldsNever } from "../../../type";
export declare type OrderByDelegate<QueryT extends AfterFromClause> = ((columns: ColumnRefUtil.ToConvenient<ColumnRefUtil.FromQuery<QueryT>>, query: QueryT) => NonEmptyTuple<ColumnUtil.FromColumnRef<ColumnRefUtil.FromQuery<QueryT>> | [ColumnUtil.FromColumnRef<ColumnRefUtil.FromQuery<QueryT>>, SortDirection] | IExpr | [IExpr, SortDirection]>);
export declare type OrderBy<QueryT extends AfterFromClause> = (Query<{
    readonly _distinct: QueryT["_distinct"];
    readonly _sqlCalcFoundRows: QueryT["_sqlCalcFoundRows"];
    readonly _joins: QueryT["_joins"];
    readonly _parentJoins: QueryT["_parentJoins"];
    readonly _selects: QueryT["_selects"];
    readonly _where: QueryT["_where"];
    readonly _grouped: QueryT["_grouped"];
    readonly _having: QueryT["_having"];
    readonly _orders: Order[];
    readonly _limit: QueryT["_limit"];
    readonly _unions: QueryT["_unions"];
    readonly _unionOrders: QueryT["_unionOrders"];
    readonly _unionLimit: QueryT["_unionLimit"];
    readonly _mapDelegate: QueryT["_mapDelegate"];
}>);
export declare type AssertValidOrderByDelegate_HackImpl<QueryT extends AfterFromClause, OrderByDelegateT extends OrderByDelegate<QueryT>> = (ToNeverIfAllFieldsNever<{
    [index in Extract<keyof ReturnType<OrderByDelegateT>, string>]: (ReturnType<OrderByDelegateT>[index] extends RawOrder ? (OrderUtil.ExtractExpr<ReturnType<OrderByDelegateT>[index]> extends never ? never : (ColumnUtil.AssertValidUsed<OrderUtil.ExtractExpr<ReturnType<OrderByDelegateT>[index]>["usedColumns"][number], Extract<ColumnUtil.FromQuery<QueryT>, IColumn>> extends never ? never : ["Invalid IExpr", index, ColumnUtil.AssertValidUsed<OrderUtil.ExtractExpr<ReturnType<OrderByDelegateT>[index]>["usedColumns"][number], Extract<ColumnUtil.FromQuery<QueryT>, IColumn>>])) : never);
}> | ToNeverIfAllFieldsNever<{
    [index in Extract<keyof ReturnType<OrderByDelegateT>, string>]: (ReturnType<OrderByDelegateT>[index] extends RawOrder ? (OrderUtil.ExtractColumn<ReturnType<OrderByDelegateT>[index]> extends ColumnUtil.FromColumnRef<ColumnRefUtil.FromQuery<QueryT>> ? never : ["Invalid IColumn", index, Exclude<OrderUtil.ExtractColumn<ReturnType<OrderByDelegateT>[index]>, ColumnUtil.FromColumnRef<ColumnRefUtil.FromQuery<QueryT>>>]) : never);
}>);
export declare type AssertValidOrderByDelegate_Hack<QueryT extends AfterFromClause, OrderByDelegateT extends OrderByDelegate<QueryT>, ResultT> = (AssertValidOrderByDelegate_HackImpl<QueryT, OrderByDelegateT> extends never ? ResultT : AssertValidOrderByDelegate_HackImpl<QueryT, OrderByDelegateT> | void);
export declare type OrderByResult<QueryT extends AfterFromClause, OrderByDelegateT extends OrderByDelegate<QueryT>> = (AssertValidOrderByDelegate_Hack<QueryT, OrderByDelegateT, OrderBy<QueryT>>);
export declare function orderBy<QueryT extends AfterFromClause, OrderByDelegateT extends OrderByDelegate<QueryT>>(query: QueryT, delegate: OrderByDelegateT): OrderByResult<QueryT, OrderByDelegateT>;
