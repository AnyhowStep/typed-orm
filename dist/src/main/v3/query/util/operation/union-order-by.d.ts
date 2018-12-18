import { Query } from "../../query";
import { AfterSelectClause, AfterFromClause, AfterUnionClause } from "../predicate";
import { ColumnRefUtil } from "../../../column-ref";
import { IExpr } from "../../../expr";
import { ColumnUtil } from "../../../column";
import { NonEmptyTuple } from "../../../tuple";
import { RawOrder, Order, OrderUtil, Sort } from "../../../order";
import { ToUnknownIfAllFieldsNever } from "../../../type";
export declare type UnionOrderByDelegate<QueryT extends AfterSelectClause & (AfterFromClause | AfterUnionClause)> = ((columns: ColumnRefUtil.ToConvenient<ColumnRefUtil.FromQuerySelects<QueryT>>, query: QueryT) => NonEmptyTuple<ColumnUtil.FromColumnRef<ColumnRefUtil.FromQuerySelects<QueryT>> | [ColumnUtil.FromColumnRef<ColumnRefUtil.FromQuerySelects<QueryT>>, Sort] | IExpr | [IExpr, Sort]>);
export declare type UnionOrderBy<QueryT extends AfterSelectClause & (AfterFromClause | AfterUnionClause)> = (Query<{
    readonly _distinct: QueryT["_distinct"];
    readonly _sqlCalcFoundRows: QueryT["_sqlCalcFoundRows"];
    readonly _joins: QueryT["_joins"];
    readonly _parentJoins: QueryT["_parentJoins"];
    readonly _selects: QueryT["_selects"];
    readonly _where: QueryT["_where"];
    readonly _grouped: QueryT["_grouped"];
    readonly _having: QueryT["_having"];
    readonly _orders: QueryT["_orders"];
    readonly _limit: QueryT["_limit"];
    readonly _unions: QueryT["_unions"];
    readonly _unionOrders: Order[];
    readonly _unionLimit: QueryT["_unionLimit"];
    readonly _mapDelegate: QueryT["_mapDelegate"];
}>);
export declare type AssertValidUnionOrderByDelegate<QueryT extends AfterSelectClause & (AfterFromClause | AfterUnionClause), UnionOrderByDelegateT extends UnionOrderByDelegate<QueryT>> = (UnionOrderByDelegateT & ToUnknownIfAllFieldsNever<{
    [index in Extract<keyof ReturnType<UnionOrderByDelegateT>, string>]: (ReturnType<UnionOrderByDelegateT>[index] extends RawOrder ? (OrderUtil.ExtractExpr<ReturnType<UnionOrderByDelegateT>[index]> extends never ? never : (ColumnRefUtil.FromQuerySelects<QueryT> extends OrderUtil.ExtractExpr<ReturnType<UnionOrderByDelegateT>[index]>["usedRef"] ? never : ["Invalid IExpr", index, Exclude<ColumnUtil.FromColumnRef<OrderUtil.ExtractExpr<ReturnType<UnionOrderByDelegateT>[index]>["usedRef"]>, ColumnUtil.FromColumnRef<ColumnRefUtil.FromQuerySelects<QueryT>>>])) : never);
}> & ToUnknownIfAllFieldsNever<{
    [index in Extract<keyof ReturnType<UnionOrderByDelegateT>, string>]: (ReturnType<UnionOrderByDelegateT>[index] extends RawOrder ? (OrderUtil.ExtractColumn<ReturnType<UnionOrderByDelegateT>[index]> extends ColumnUtil.FromColumnRef<ColumnRefUtil.FromQuerySelects<QueryT>> ? never : ["Invalid IColumn", index, Exclude<OrderUtil.ExtractColumn<ReturnType<UnionOrderByDelegateT>[index]>, ColumnUtil.FromColumnRef<ColumnRefUtil.FromQuerySelects<QueryT>>>]) : never);
}>);
export declare function unionOrderBy<QueryT extends AfterSelectClause & (AfterFromClause | AfterUnionClause), UnionOrderByDelegateT extends UnionOrderByDelegate<QueryT>>(query: QueryT, delegate: AssertValidUnionOrderByDelegate<QueryT, UnionOrderByDelegateT>): UnionOrderBy<QueryT>;
//# sourceMappingURL=union-order-by.d.ts.map