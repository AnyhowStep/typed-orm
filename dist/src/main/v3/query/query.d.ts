import { IJoin } from "../join";
import { IAliasedTable } from "../aliased-table";
import { SelectItem } from "../select-item";
import { IAnonymousTypedExpr } from "../expr";
import * as QueryUtil from "./util";
import { ColumnIdentifier } from "../column-identifier";
import { Order } from "../order";
import { MapDelegate } from "../map-delegate";
import { NonEmptyTuple } from "../tuple";
import { ITable } from "../table";
import { RawExpr, RawExprUtil } from "../raw-expr";
import { PrimitiveExpr } from "../primitive-expr";
export interface UnionQuery {
    readonly distinct: boolean;
    readonly query: QueryUtil.AfterSelectClause;
}
export interface LimitData {
    readonly maxRowCount: number;
    readonly offset: number;
}
export interface QueryData {
    readonly _distinct: boolean;
    readonly _sqlCalcFoundRows: boolean;
    readonly _joins: IJoin[] | undefined;
    readonly _parentJoins: IJoin[] | undefined;
    readonly _selects: SelectItem[] | undefined;
    readonly _where: IAnonymousTypedExpr<boolean> | undefined;
    readonly _grouped: ColumnIdentifier[] | undefined;
    readonly _having: IAnonymousTypedExpr<boolean> | undefined;
    readonly _orders: Order[] | undefined;
    readonly _limit: LimitData | undefined;
    readonly _unions: UnionQuery[] | undefined;
    readonly _unionOrders: Order[] | undefined;
    readonly _unionLimit: LimitData | undefined;
    readonly _mapDelegate: MapDelegate | undefined;
}
export interface IQuery<DataT extends QueryData = QueryData> {
    readonly _distinct: DataT["_distinct"];
    readonly _sqlCalcFoundRows: DataT["_sqlCalcFoundRows"];
    readonly _joins: DataT["_joins"];
    readonly _parentJoins: DataT["_parentJoins"];
    readonly _selects: DataT["_selects"];
    readonly _where: DataT["_where"];
    readonly _grouped: DataT["_grouped"];
    readonly _having: DataT["_having"];
    readonly _orders: DataT["_orders"];
    readonly _limit: DataT["_limit"];
    readonly _unions: DataT["_unions"];
    readonly _unionOrders: DataT["_unionOrders"];
    readonly _unionLimit: DataT["_unionLimit"];
    readonly _mapDelegate: DataT["_mapDelegate"];
}
export declare class Query<DataT extends QueryData> {
    readonly _distinct: DataT["_distinct"];
    readonly _sqlCalcFoundRows: DataT["_sqlCalcFoundRows"];
    readonly _joins: DataT["_joins"];
    readonly _parentJoins: DataT["_parentJoins"];
    readonly _selects: DataT["_selects"];
    readonly _where: DataT["_where"];
    readonly _grouped: DataT["_grouped"];
    readonly _having: DataT["_having"];
    readonly _orders: DataT["_orders"];
    readonly _limit: DataT["_limit"];
    readonly _unions: DataT["_unions"];
    readonly _unionOrders: DataT["_unionOrders"];
    readonly _unionLimit: DataT["_unionLimit"];
    readonly _mapDelegate: DataT["_mapDelegate"];
    constructor(data: DataT);
    from<AliasedTableT extends IAliasedTable>(this: Extract<this, QueryUtil.BeforeFromClause>, aliasedTable: QueryUtil.AssertValidJoinTarget<Extract<this, QueryUtil.BeforeFromClause>, AliasedTableT>): (QueryUtil.From<Extract<this, QueryUtil.BeforeFromClause>, AliasedTableT>);
    innerJoin<AliasedTableT extends IAliasedTable, FromDelegateT extends QueryUtil.JoinFromDelegate<Extract<this, QueryUtil.AfterFromClause>["_joins"]>>(this: Extract<this, QueryUtil.AfterFromClause>, aliasedTable: QueryUtil.AssertValidJoinTarget<Extract<this, QueryUtil.AfterFromClause>, AliasedTableT>, fromDelegate: FromDelegateT, toDelegate: QueryUtil.JoinToDelegate<Extract<this, QueryUtil.AfterFromClause>, AliasedTableT, FromDelegateT>): (QueryUtil.InnerJoin<Extract<this, QueryUtil.AfterFromClause>, AliasedTableT>);
    leftJoin<AliasedTableT extends IAliasedTable, FromDelegateT extends QueryUtil.JoinFromDelegate<Extract<this, QueryUtil.AfterFromClause>["_joins"]>>(this: Extract<this, QueryUtil.AfterFromClause>, aliasedTable: QueryUtil.AssertValidJoinTarget<Extract<this, QueryUtil.AfterFromClause>, AliasedTableT>, fromDelegate: FromDelegateT, toDelegate: QueryUtil.JoinToDelegate<Extract<this, QueryUtil.AfterFromClause>, AliasedTableT, FromDelegateT>): (QueryUtil.LeftJoin<Extract<this, QueryUtil.AfterFromClause>, AliasedTableT>);
    rightJoin<AliasedTableT extends IAliasedTable, FromDelegateT extends QueryUtil.JoinFromDelegate<Extract<this, QueryUtil.AfterFromClause>["_joins"]>>(this: Extract<this, QueryUtil.AfterFromClause>, aliasedTable: QueryUtil.AssertValidJoinTarget<Extract<this, QueryUtil.AfterFromClause>, AliasedTableT>, fromDelegate: FromDelegateT, toDelegate: QueryUtil.JoinToDelegate<Extract<this, QueryUtil.AfterFromClause>, AliasedTableT, FromDelegateT>): (QueryUtil.RightJoin<Extract<this, QueryUtil.AfterFromClause>, AliasedTableT>);
    innerJoinUsing<AliasedTableT extends IAliasedTable, UsingDelegateT extends QueryUtil.JoinUsingDelegate<Extract<this, QueryUtil.AfterFromClause>["_joins"], AliasedTableT>>(this: Extract<this, QueryUtil.AfterFromClause>, aliasedTable: QueryUtil.AssertValidJoinTarget<Extract<this, QueryUtil.AfterFromClause>, AliasedTableT>, usingDelegate: UsingDelegateT): (QueryUtil.InnerJoin<Extract<this, QueryUtil.AfterFromClause>, AliasedTableT>);
    leftJoinUsing<AliasedTableT extends IAliasedTable, UsingDelegateT extends QueryUtil.JoinUsingDelegate<Extract<this, QueryUtil.AfterFromClause>["_joins"], AliasedTableT>>(this: Extract<this, QueryUtil.AfterFromClause>, aliasedTable: QueryUtil.AssertValidJoinTarget<Extract<this, QueryUtil.AfterFromClause>, AliasedTableT>, usingDelegate: UsingDelegateT): (QueryUtil.LeftJoin<Extract<this, QueryUtil.AfterFromClause>, AliasedTableT>);
    rightJoinUsing<AliasedTableT extends IAliasedTable, UsingDelegateT extends QueryUtil.JoinUsingDelegate<Extract<this, QueryUtil.AfterFromClause>["_joins"], AliasedTableT>>(this: Extract<this, QueryUtil.AfterFromClause>, aliasedTable: QueryUtil.AssertValidJoinTarget<Extract<this, QueryUtil.AfterFromClause>, AliasedTableT>, usingDelegate: UsingDelegateT): (QueryUtil.RightJoin<Extract<this, QueryUtil.AfterFromClause>, AliasedTableT>);
    innerJoinOne<TableT extends ITable, FromDelegateT extends QueryUtil.JoinFromDelegate<Extract<this, QueryUtil.AfterFromClause>["_joins"]>, ToDelegateT extends QueryUtil.JoinToDelegate<Extract<this, QueryUtil.AfterFromClause>, TableT, FromDelegateT>>(this: Extract<this, QueryUtil.AfterFromClause>, table: QueryUtil.AssertValidJoinTarget<Extract<this, QueryUtil.AfterFromClause>, TableT>, fromDelegate: FromDelegateT, toDelegate: QueryUtil.AssertValidJoinToOneDelegate<Extract<this, QueryUtil.AfterFromClause>, TableT, FromDelegateT, ToDelegateT>): (QueryUtil.InnerJoin<Extract<this, QueryUtil.AfterFromClause>, TableT>);
    innerJoinOneUsing<TableT extends ITable, UsingDelegateT extends QueryUtil.JoinUsingDelegate<Extract<this, QueryUtil.AfterFromClause>["_joins"], TableT>>(this: Extract<this, QueryUtil.AfterFromClause>, table: QueryUtil.AssertValidJoinTarget<Extract<this, QueryUtil.AfterFromClause>, TableT>, usingDelegate: QueryUtil.AssertValidJoinOneUsingDelegate<Extract<this, QueryUtil.AfterFromClause>, TableT, UsingDelegateT>): (QueryUtil.InnerJoin<Extract<this, QueryUtil.AfterFromClause>, TableT>);
    select<SelectDelegateT extends QueryUtil.SelectDelegate<Extract<this, QueryUtil.BeforeUnionClause>>>(this: Extract<this, QueryUtil.BeforeUnionClause>, delegate: QueryUtil.AssertValidSelectDelegate<Extract<this, QueryUtil.BeforeUnionClause>, SelectDelegateT>): (QueryUtil.Select<Extract<this, QueryUtil.BeforeUnionClause>, SelectDelegateT>);
    selectExpr<SelectDelegateT extends QueryUtil.SelectExprDelegate<Extract<this, QueryUtil.BeforeUnionClause & QueryUtil.BeforeSelectClause>>>(this: Extract<this, QueryUtil.BeforeUnionClause & QueryUtil.BeforeSelectClause>, delegate: QueryUtil.AssertValidSelectExprDelegate<Extract<this, QueryUtil.BeforeUnionClause & QueryUtil.BeforeSelectClause>, SelectDelegateT>): (QueryUtil.SelectExpr<Extract<this, QueryUtil.BeforeUnionClause & QueryUtil.BeforeSelectClause>, SelectDelegateT>);
    andWhere<AndWhereDelegateT extends QueryUtil.AndWhereDelegate<Extract<this, QueryUtil.AfterFromClause>>>(this: Extract<this, QueryUtil.AfterFromClause>, delegate: QueryUtil.AssertValidAndWhereDelegate<Extract<this, QueryUtil.AfterFromClause>, AndWhereDelegateT>): QueryUtil.AndWhere<Extract<this, QueryUtil.AfterFromClause>>;
    groupBy<GroupByDelegateT extends QueryUtil.GroupByDelegate<Extract<this, QueryUtil.AfterFromClause>>>(this: Extract<this, QueryUtil.AfterFromClause>, delegate: QueryUtil.AssertValidGroupByDelegate<Extract<this, QueryUtil.AfterFromClause>, GroupByDelegateT>): QueryUtil.GroupBy<Extract<this, QueryUtil.AfterFromClause>>;
    andHaving<AndHavingDelegateT extends QueryUtil.AndHavingDelegate<Extract<this, QueryUtil.AfterFromClause>>>(this: Extract<this, QueryUtil.AfterFromClause>, delegate: QueryUtil.AssertValidAndHavingDelegate<Extract<this, QueryUtil.AfterFromClause>, AndHavingDelegateT>): QueryUtil.AndHaving<Extract<this, QueryUtil.AfterFromClause>>;
    orderBy<OrderByDelegateT extends QueryUtil.OrderByDelegate<Extract<this, QueryUtil.AfterFromClause>>>(this: Extract<this, QueryUtil.AfterFromClause>, delegate: QueryUtil.AssertValidOrderByDelegate<Extract<this, QueryUtil.AfterFromClause>, OrderByDelegateT>): QueryUtil.OrderBy<Extract<this, QueryUtil.AfterFromClause>>;
    limit<MaxRowCountT extends number>(maxRowCount: MaxRowCountT): QueryUtil.Limit<this, MaxRowCountT>;
    offset<OffsetT extends number>(offset: OffsetT): QueryUtil.Offset<this, OffsetT>;
    union<OtherT extends QueryUtil.AfterSelectClause>(this: Extract<this, QueryUtil.AfterSelectClause>, other: QueryUtil.AssertUnionCompatibleQuery<Extract<this, QueryUtil.AfterSelectClause>, OtherT>): QueryUtil.Union<Extract<this, QueryUtil.AfterSelectClause>>;
    union<OtherT extends QueryUtil.AfterSelectClause>(this: Extract<this, QueryUtil.AfterSelectClause>, unionType: QueryUtil.UnionType, other: QueryUtil.AssertUnionCompatibleQuery<Extract<this, QueryUtil.AfterSelectClause>, OtherT>): QueryUtil.Union<Extract<this, QueryUtil.AfterSelectClause>>;
    unionOrderBy<UnionOrderByDelegateT extends QueryUtil.UnionOrderByDelegate<Extract<this, QueryUtil.AfterSelectClause & (QueryUtil.AfterFromClause | QueryUtil.AfterUnionClause)>>>(this: Extract<this, QueryUtil.AfterSelectClause & (QueryUtil.AfterFromClause | QueryUtil.AfterUnionClause)>, delegate: QueryUtil.AssertValidUnionOrderByDelegate<Extract<this, QueryUtil.AfterSelectClause & (QueryUtil.AfterFromClause | QueryUtil.AfterUnionClause)>, UnionOrderByDelegateT>): QueryUtil.UnionOrderBy<Extract<this, QueryUtil.AfterSelectClause & (QueryUtil.AfterFromClause | QueryUtil.AfterUnionClause)>>;
    unionLimit<MaxRowCountT extends number>(maxRowCount: MaxRowCountT): QueryUtil.UnionLimit<this, MaxRowCountT>;
    unionOffset<OffsetT extends number>(offset: OffsetT): QueryUtil.UnionOffset<this, OffsetT>;
    distinct(this: Extract<this, QueryUtil.AfterSelectClause>): QueryUtil.Distinct<Extract<this, QueryUtil.AfterSelectClause>>;
    sqlCalcFoundRows(this: Extract<this, QueryUtil.AfterSelectClause>): QueryUtil.SqlCalcFoundRows<Extract<this, QueryUtil.AfterSelectClause>>;
    crossJoin<AliasedTableT extends IAliasedTable>(this: Extract<this, QueryUtil.AfterFromClause>, aliasedTable: QueryUtil.AssertValidJoinTarget<Extract<this, QueryUtil.AfterFromClause>, AliasedTableT>): (QueryUtil.CrossJoin<Extract<this, QueryUtil.AfterFromClause>, AliasedTableT>);
    requireParentJoins<ArrT extends NonEmptyTuple<IAliasedTable>>(...arr: QueryUtil.AssertValidParentJoins<this, ArrT>): (QueryUtil.RequireParentJoins<this, false, ArrT>);
    requireNullableParentJoins<ArrT extends NonEmptyTuple<IAliasedTable>>(...arr: QueryUtil.AssertValidParentJoins<this, ArrT>): (QueryUtil.RequireParentJoins<this, true, ArrT>);
    as<AliasT extends string>(this: QueryUtil.AssertAliasableQuery<Extract<this, QueryUtil.AfterSelectClause>>, alias: AliasT): (QueryUtil.As<Extract<this, QueryUtil.AfterSelectClause>, AliasT>);
    coalesce<DefaultT extends RawExpr<RawExprUtil.TypeOf<Extract<this, RawExpr<PrimitiveExpr>>>>>(this: Extract<this, RawExpr<PrimitiveExpr>>, defaultExpr: DefaultT): (QueryUtil.Coalesce<Extract<this, RawExpr<PrimitiveExpr>>, DefaultT>);
    map<DelegateT extends MapDelegate<QueryUtil.MappedType<Extract<this, QueryUtil.AfterSelectClause>>, QueryUtil.UnmappedType<Extract<this, QueryUtil.AfterSelectClause>["_selects"]>, any>>(this: Extract<this, QueryUtil.AfterSelectClause>, delegate: DelegateT): (QueryUtil.Map<Extract<this, QueryUtil.AfterSelectClause>, DelegateT>);
}
export declare function from<AliasedTableT extends IAliasedTable>(aliasedTable: QueryUtil.AssertValidJoinTarget<QueryUtil.NewInstance, AliasedTableT>): (QueryUtil.From<QueryUtil.NewInstance, AliasedTableT>);
export declare function select<SelectDelegateT extends QueryUtil.SelectDelegate<QueryUtil.NewInstance>>(delegate: QueryUtil.AssertValidSelectDelegate<QueryUtil.NewInstance, SelectDelegateT>): (QueryUtil.Select<QueryUtil.NewInstance, SelectDelegateT>);
export declare function selectExpr<SelectDelegateT extends QueryUtil.SelectExprDelegate<QueryUtil.NewInstance>>(delegate: QueryUtil.AssertValidSelectExprDelegate<QueryUtil.NewInstance, SelectDelegateT>): (QueryUtil.SelectExpr<QueryUtil.NewInstance, SelectDelegateT>);
export declare function requireParentJoins<ArrT extends NonEmptyTuple<IAliasedTable>>(...arr: QueryUtil.AssertValidParentJoins<QueryUtil.NewInstance, ArrT>): (QueryUtil.RequireParentJoins<QueryUtil.NewInstance, false, ArrT>);
export declare function requireNullableParentJoins<ArrT extends NonEmptyTuple<IAliasedTable>>(...arr: QueryUtil.AssertValidParentJoins<QueryUtil.NewInstance, ArrT>): (QueryUtil.RequireParentJoins<QueryUtil.NewInstance, true, ArrT>);
//# sourceMappingURL=query.d.ts.map