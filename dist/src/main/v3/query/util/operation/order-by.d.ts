import { Query } from "../../query";
import { AfterFromClause } from "../predicate";
import { ColumnRefUtil } from "../../../column-ref";
import { IExpr } from "../../../expr";
import { ColumnUtil } from "../../../column";
import { NonEmptyTuple } from "../../../tuple";
import { RawOrder, Order, OrderUtil } from "../../../order";
import { ToUnknownIfAllFieldsNever } from "../../../type";
export declare type OrderByDelegate<QueryT extends AfterFromClause> = ((columns: ColumnRefUtil.ToConvenient<ColumnRefUtil.FromQuery<QueryT>>, query: QueryT) => NonEmptyTuple<RawOrder>);
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
export declare type AssertValidOrderByDelegate<QueryT extends AfterFromClause, OrderByDelegateT extends OrderByDelegate<QueryT>> = (OrderByDelegateT & ToUnknownIfAllFieldsNever<{
    [index in Extract<keyof ReturnType<OrderByDelegateT>, string>]: (ReturnType<OrderByDelegateT>[index] extends RawOrder ? (OrderUtil.ExtractExpr<ReturnType<OrderByDelegateT>[index]> extends IExpr ? (ColumnRefUtil.FromQueryJoins<QueryT> extends OrderUtil.ExtractExpr<ReturnType<OrderByDelegateT>[index]>["usedRef"] ? never : ["Invalid IExpr", Exclude<ColumnUtil.FromColumnRef<OrderUtil.ExtractExpr<ReturnType<OrderByDelegateT>[index]>["usedRef"]>, ColumnUtil.FromColumnRef<ColumnRefUtil.FromQueryJoins<QueryT>>>]) : never) : never);
}> & ToUnknownIfAllFieldsNever<{
    [index in Extract<keyof ReturnType<OrderByDelegateT>, string>]: (ReturnType<OrderByDelegateT>[index] extends RawOrder ? (OrderUtil.ExtractColumn<ReturnType<OrderByDelegateT>[index]> extends ColumnUtil.FromColumnRef<ColumnRefUtil.FromQueryJoins<QueryT>> ? never : ["Invalid IColumn", Exclude<OrderUtil.ExtractColumn<ReturnType<OrderByDelegateT>[index]>, ColumnUtil.FromColumnRef<ColumnRefUtil.FromQueryJoins<QueryT>>>]) : never);
}>);
export declare function orderBy<QueryT extends AfterFromClause, OrderByDelegateT extends OrderByDelegate<QueryT>>(query: QueryT, delegate: AssertValidOrderByDelegate<QueryT, OrderByDelegateT>): OrderBy<QueryT>;
//# sourceMappingURL=order-by.d.ts.map