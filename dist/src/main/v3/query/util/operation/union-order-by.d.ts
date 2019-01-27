import { Query } from "../../query";
import { AfterSelectClause, AfterFromClause, AfterUnionClause } from "../predicate";
import { ColumnRefUtil } from "../../../column-ref";
import { IExpr } from "../../../expr";
import { ColumnUtil } from "../../../column";
import { NonEmptyTuple } from "../../../tuple";
import { RawOrder, Order, OrderUtil, SortDirection } from "../../../order";
import { ToNeverIfAllFieldsNever } from "../../../type";
export declare type UnionOrderByDelegate<QueryT extends AfterSelectClause & (AfterFromClause | AfterUnionClause)> = ((columns: ColumnRefUtil.ToConvenient<ColumnRefUtil.FromQuerySelects<QueryT>>, query: QueryT) => NonEmptyTuple<ColumnUtil.FromColumnRef<ColumnRefUtil.FromQuerySelects<QueryT>> | [ColumnUtil.FromColumnRef<ColumnRefUtil.FromQuerySelects<QueryT>>, SortDirection] | IExpr | [IExpr, SortDirection]>);
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
export declare type AssertValidUnionOrderByDelegate_HackImpl<QueryT extends AfterSelectClause & (AfterFromClause | AfterUnionClause), UnionOrderByDelegateT extends UnionOrderByDelegate<QueryT>> = (ToNeverIfAllFieldsNever<{
    [index in Extract<keyof ReturnType<UnionOrderByDelegateT>, string>]: (ReturnType<UnionOrderByDelegateT>[index] extends RawOrder ? (OrderUtil.ExtractExpr<ReturnType<UnionOrderByDelegateT>[index]> extends never ? never : (ColumnUtil.AssertValidUsed<OrderUtil.ExtractExpr<ReturnType<UnionOrderByDelegateT>[index]>["usedColumns"][number], ColumnUtil.FromQuerySelects<QueryT>> extends never ? never : ["Invalid IExpr", index, ColumnUtil.AssertValidUsed<OrderUtil.ExtractExpr<ReturnType<UnionOrderByDelegateT>[index]>["usedColumns"][number], ColumnUtil.FromQuerySelects<QueryT>>])) : never);
}> | ToNeverIfAllFieldsNever<{
    [index in Extract<keyof ReturnType<UnionOrderByDelegateT>, string>]: (ReturnType<UnionOrderByDelegateT>[index] extends RawOrder ? (OrderUtil.ExtractColumn<ReturnType<UnionOrderByDelegateT>[index]> extends ColumnUtil.FromColumnRef<ColumnRefUtil.FromQuerySelects<QueryT>> ? never : ["Invalid IColumn", index, Exclude<OrderUtil.ExtractColumn<ReturnType<UnionOrderByDelegateT>[index]>, ColumnUtil.FromColumnRef<ColumnRefUtil.FromQuerySelects<QueryT>>>]) : never);
}>);
export declare type AssertValidUnionOrderByDelegate_Hack<QueryT extends AfterSelectClause & (AfterFromClause | AfterUnionClause), UnionOrderByDelegateT extends UnionOrderByDelegate<QueryT>, ResultT> = (UnionOrderByDelegateT & AssertValidUnionOrderByDelegate_HackImpl<QueryT, UnionOrderByDelegateT> extends never ? ResultT : AssertValidUnionOrderByDelegate_HackImpl<QueryT, UnionOrderByDelegateT> | void);
export declare type UnionOrderByResult<QueryT extends AfterSelectClause & (AfterFromClause | AfterUnionClause), UnionOrderByDelegateT extends UnionOrderByDelegate<QueryT>> = (AssertValidUnionOrderByDelegate_Hack<QueryT, UnionOrderByDelegateT, UnionOrderBy<QueryT>>);
export declare function unionOrderBy<QueryT extends AfterSelectClause & (AfterFromClause | AfterUnionClause), UnionOrderByDelegateT extends UnionOrderByDelegate<QueryT>>(query: QueryT, delegate: UnionOrderByDelegateT): (UnionOrderByResult<QueryT, UnionOrderByDelegateT>);
