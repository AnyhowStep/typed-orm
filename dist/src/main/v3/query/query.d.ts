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
import { PrimitiveExpr, NonNullPrimitiveExpr } from "../primitive-expr";
import { IJoinDeclaration } from "../join-declaration";
import { IConnection } from "../execution";
import { InsertSelectRowDelegate } from "../insert-select";
import { UpdateUtil, UpdatableQuery } from "../update";
import { DeletableQuery, DeleteUtil, Delete, DeleteModifier } from "../delete";
import { Row } from "../row";
import { CandidateKey } from "../candidate-key";
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
    rightJoin<AliasedTableT extends IAliasedTable, FromDelegateT extends QueryUtil.JoinFromDelegate<Extract<this, QueryUtil.AfterFromClause & QueryUtil.CanWidenColumnTypes>["_joins"]>>(this: Extract<this, QueryUtil.AfterFromClause & QueryUtil.CanWidenColumnTypes>, aliasedTable: QueryUtil.AssertValidJoinTarget<Extract<this, QueryUtil.AfterFromClause & QueryUtil.CanWidenColumnTypes>, AliasedTableT>, fromDelegate: FromDelegateT, toDelegate: QueryUtil.JoinToDelegate<Extract<this, QueryUtil.AfterFromClause & QueryUtil.CanWidenColumnTypes>, AliasedTableT, FromDelegateT>): (QueryUtil.RightJoin<Extract<this, QueryUtil.AfterFromClause & QueryUtil.CanWidenColumnTypes>, AliasedTableT>);
    innerJoinUsing<AliasedTableT extends IAliasedTable, UsingDelegateT extends QueryUtil.JoinUsingDelegate<Extract<this, QueryUtil.AfterFromClause>["_joins"], AliasedTableT>>(this: Extract<this, QueryUtil.AfterFromClause>, aliasedTable: QueryUtil.AssertValidJoinTarget<Extract<this, QueryUtil.AfterFromClause>, AliasedTableT>, usingDelegate: UsingDelegateT): (QueryUtil.InnerJoin<Extract<this, QueryUtil.AfterFromClause>, AliasedTableT>);
    leftJoinUsing<AliasedTableT extends IAliasedTable, UsingDelegateT extends QueryUtil.JoinUsingDelegate<Extract<this, QueryUtil.AfterFromClause>["_joins"], AliasedTableT>>(this: Extract<this, QueryUtil.AfterFromClause>, aliasedTable: QueryUtil.AssertValidJoinTarget<Extract<this, QueryUtil.AfterFromClause>, AliasedTableT>, usingDelegate: UsingDelegateT): (QueryUtil.LeftJoin<Extract<this, QueryUtil.AfterFromClause>, AliasedTableT>);
    rightJoinUsing<AliasedTableT extends IAliasedTable, UsingDelegateT extends QueryUtil.JoinUsingDelegate<Extract<this, QueryUtil.AfterFromClause & QueryUtil.CanWidenColumnTypes>["_joins"], AliasedTableT>>(this: Extract<this, QueryUtil.AfterFromClause & QueryUtil.CanWidenColumnTypes>, aliasedTable: QueryUtil.AssertValidJoinTarget<Extract<this, QueryUtil.AfterFromClause & QueryUtil.CanWidenColumnTypes>, AliasedTableT>, usingDelegate: UsingDelegateT): (QueryUtil.RightJoin<Extract<this, QueryUtil.AfterFromClause & QueryUtil.CanWidenColumnTypes>, AliasedTableT>);
    innerJoinCk<TableT extends ITable, FromDelegateT extends QueryUtil.JoinFromDelegate<Extract<this, QueryUtil.AfterFromClause>["_joins"]>, ToDelegateT extends QueryUtil.JoinToDelegate<Extract<this, QueryUtil.AfterFromClause>, TableT, FromDelegateT>>(this: Extract<this, QueryUtil.AfterFromClause>, table: QueryUtil.AssertValidJoinTarget<Extract<this, QueryUtil.AfterFromClause>, TableT>, fromDelegate: FromDelegateT, toDelegate: ToDelegateT): (QueryUtil.AssertValidJoinCkDelegate_Hack<Extract<this, QueryUtil.AfterFromClause>, TableT, FromDelegateT, ToDelegateT, QueryUtil.InnerJoin<Extract<this, QueryUtil.AfterFromClause>, TableT>>);
    leftJoinCk<TableT extends ITable, FromDelegateT extends QueryUtil.JoinFromDelegate<Extract<this, QueryUtil.AfterFromClause>["_joins"]>, ToDelegateT extends QueryUtil.JoinToDelegate<Extract<this, QueryUtil.AfterFromClause>, TableT, FromDelegateT>>(this: Extract<this, QueryUtil.AfterFromClause>, table: QueryUtil.AssertValidJoinTarget<Extract<this, QueryUtil.AfterFromClause>, TableT>, fromDelegate: FromDelegateT, toDelegate: ToDelegateT): (QueryUtil.AssertValidJoinCkDelegate_Hack<Extract<this, QueryUtil.AfterFromClause>, TableT, FromDelegateT, ToDelegateT, QueryUtil.LeftJoin<Extract<this, QueryUtil.AfterFromClause>, TableT>>);
    rightJoinCk<TableT extends ITable, FromDelegateT extends QueryUtil.JoinFromDelegate<Extract<this, QueryUtil.AfterFromClause & QueryUtil.CanWidenColumnTypes>["_joins"]>, ToDelegateT extends QueryUtil.JoinToDelegate<Extract<this, QueryUtil.AfterFromClause & QueryUtil.CanWidenColumnTypes>, TableT, FromDelegateT>>(this: Extract<this, QueryUtil.AfterFromClause & QueryUtil.CanWidenColumnTypes>, table: QueryUtil.AssertValidJoinTarget<Extract<this, QueryUtil.AfterFromClause & QueryUtil.CanWidenColumnTypes>, TableT>, fromDelegate: FromDelegateT, toDelegate: ToDelegateT): (QueryUtil.AssertValidJoinCkDelegate_Hack<Extract<this, QueryUtil.AfterFromClause & QueryUtil.CanWidenColumnTypes>, TableT, FromDelegateT, ToDelegateT, QueryUtil.RightJoin<Extract<this, QueryUtil.AfterFromClause & QueryUtil.CanWidenColumnTypes>, TableT>>);
    innerJoinCkUsing<TableT extends ITable, UsingDelegateT extends QueryUtil.JoinUsingDelegate<Extract<this, QueryUtil.AfterFromClause>["_joins"], TableT>>(this: Extract<this, QueryUtil.AfterFromClause>, table: QueryUtil.AssertValidJoinTarget<Extract<this, QueryUtil.AfterFromClause>, TableT>, usingDelegate: UsingDelegateT): (QueryUtil.AssertValidJoinCkUsingDelegate_Hack<Extract<this, QueryUtil.AfterFromClause>, TableT, UsingDelegateT, QueryUtil.InnerJoin<Extract<this, QueryUtil.AfterFromClause>, TableT>>);
    leftJoinCkUsing<TableT extends ITable, UsingDelegateT extends QueryUtil.JoinUsingDelegate<Extract<this, QueryUtil.AfterFromClause>["_joins"], TableT>>(this: Extract<this, QueryUtil.AfterFromClause>, table: QueryUtil.AssertValidJoinTarget<Extract<this, QueryUtil.AfterFromClause>, TableT>, usingDelegate: UsingDelegateT): (QueryUtil.AssertValidJoinCkUsingDelegate_Hack<Extract<this, QueryUtil.AfterFromClause>, TableT, UsingDelegateT, QueryUtil.LeftJoin<Extract<this, QueryUtil.AfterFromClause>, TableT>>);
    rightJoinCkUsing<TableT extends ITable, UsingDelegateT extends QueryUtil.JoinUsingDelegate<Extract<this, QueryUtil.AfterFromClause & QueryUtil.CanWidenColumnTypes>["_joins"], TableT>>(this: Extract<this, QueryUtil.AfterFromClause & QueryUtil.CanWidenColumnTypes>, table: QueryUtil.AssertValidJoinTarget<Extract<this, QueryUtil.AfterFromClause & QueryUtil.CanWidenColumnTypes>, TableT>, usingDelegate: UsingDelegateT): (QueryUtil.AssertValidJoinCkUsingDelegate_Hack<Extract<this, QueryUtil.AfterFromClause & QueryUtil.CanWidenColumnTypes>, TableT, UsingDelegateT, QueryUtil.RightJoin<Extract<this, QueryUtil.AfterFromClause & QueryUtil.CanWidenColumnTypes>, TableT>>);
    innerJoinPk<DelegateT extends QueryUtil.JoinPkDelegate<Extract<this, QueryUtil.AfterFromClause>>, ToTableT extends ITable & {
        primaryKey: string[];
    }>(this: Extract<this, QueryUtil.AfterFromClause>, delegate: DelegateT, toTable: QueryUtil.AssertValidJoinPk_FromDelegate<Extract<this, QueryUtil.AfterFromClause>, DelegateT, ToTableT>): (QueryUtil.InnerJoin<Extract<this, QueryUtil.AfterFromClause>, ToTableT>);
    leftJoinPk<DelegateT extends QueryUtil.JoinPkDelegate<Extract<this, QueryUtil.AfterFromClause>>, ToTableT extends ITable & {
        primaryKey: string[];
    }>(this: Extract<this, QueryUtil.AfterFromClause>, delegate: DelegateT, toTable: QueryUtil.AssertValidJoinPk_FromDelegate<Extract<this, QueryUtil.AfterFromClause>, DelegateT, ToTableT>): (QueryUtil.LeftJoin<Extract<this, QueryUtil.AfterFromClause>, ToTableT>);
    rightJoinPk<DelegateT extends QueryUtil.JoinPkDelegate<Extract<this, QueryUtil.AfterFromClause & QueryUtil.CanWidenColumnTypes>>, ToTableT extends ITable & {
        primaryKey: string[];
    }>(this: Extract<this, QueryUtil.AfterFromClause & QueryUtil.CanWidenColumnTypes>, delegate: DelegateT, toTable: QueryUtil.AssertValidJoinPk_FromDelegate<Extract<this, QueryUtil.AfterFromClause & QueryUtil.CanWidenColumnTypes>, DelegateT, ToTableT>): (QueryUtil.RightJoin<Extract<this, QueryUtil.AfterFromClause & QueryUtil.CanWidenColumnTypes>, ToTableT>);
    innerJoinFromPk<DelegateT extends QueryUtil.JoinFromPkDelegate<Extract<this, QueryUtil.AfterFromClause>>, ToTableT extends IAliasedTable>(this: Extract<this, QueryUtil.AfterFromClause>, delegate: DelegateT, toTable: QueryUtil.AssertValidJoinFromPk_FromDelegate<Extract<this, QueryUtil.AfterFromClause>, DelegateT, ToTableT>): (QueryUtil.InnerJoin<Extract<this, QueryUtil.AfterFromClause>, ToTableT>);
    leftJoinFromPk<DelegateT extends QueryUtil.JoinFromPkDelegate<Extract<this, QueryUtil.AfterFromClause>>, ToTableT extends IAliasedTable>(this: Extract<this, QueryUtil.AfterFromClause>, delegate: DelegateT, toTable: QueryUtil.AssertValidJoinFromPk_FromDelegate<Extract<this, QueryUtil.AfterFromClause>, DelegateT, ToTableT>): (QueryUtil.LeftJoin<Extract<this, QueryUtil.AfterFromClause>, ToTableT>);
    rightJoinFromPk<DelegateT extends QueryUtil.JoinFromPkDelegate<Extract<this, QueryUtil.AfterFromClause & QueryUtil.CanWidenColumnTypes>>, ToTableT extends IAliasedTable>(this: Extract<this, QueryUtil.AfterFromClause & QueryUtil.CanWidenColumnTypes>, delegate: DelegateT, toTable: QueryUtil.AssertValidJoinFromPk_FromDelegate<Extract<this, QueryUtil.AfterFromClause & QueryUtil.CanWidenColumnTypes>, DelegateT, ToTableT>): (QueryUtil.RightJoin<Extract<this, QueryUtil.AfterFromClause & QueryUtil.CanWidenColumnTypes>, ToTableT>);
    select<SelectDelegateT extends QueryUtil.SelectDelegate<Extract<this, QueryUtil.BeforeUnionClause>>>(this: Extract<this, QueryUtil.BeforeUnionClause>, delegate: QueryUtil.AssertValidSelectDelegate<Extract<this, QueryUtil.BeforeUnionClause>, SelectDelegateT>): (QueryUtil.Select<Extract<this, QueryUtil.BeforeUnionClause>, SelectDelegateT>);
    selectUnsafe<SelectDelegateT extends QueryUtil.SelectDelegate<Extract<this, QueryUtil.BeforeUnionClause>>>(this: Extract<this, QueryUtil.BeforeUnionClause>, delegate: SelectDelegateT): (QueryUtil.Select<Extract<this, QueryUtil.BeforeUnionClause>, SelectDelegateT>);
    selectExpr<SelectDelegateT extends QueryUtil.SelectExprDelegate<Extract<this, QueryUtil.BeforeUnionClause & QueryUtil.BeforeSelectClause>>>(this: Extract<this, QueryUtil.BeforeUnionClause & QueryUtil.BeforeSelectClause>, delegate: QueryUtil.AssertValidSelectExprDelegate<Extract<this, QueryUtil.BeforeUnionClause & QueryUtil.BeforeSelectClause>, SelectDelegateT>): (QueryUtil.SelectExpr<Extract<this, QueryUtil.BeforeUnionClause & QueryUtil.BeforeSelectClause>, SelectDelegateT>);
    where<WhereDelegateT extends QueryUtil.WhereDelegate<Extract<this, QueryUtil.AfterFromClause>>>(this: Extract<this, QueryUtil.AfterFromClause>, delegate: QueryUtil.AssertValidWhereDelegate<Extract<this, QueryUtil.AfterFromClause>, WhereDelegateT>): QueryUtil.Where<Extract<this, QueryUtil.AfterFromClause>>;
    groupBy<GroupByDelegateT extends QueryUtil.GroupByDelegate<Extract<this, QueryUtil.AfterFromClause>>>(this: Extract<this, QueryUtil.AfterFromClause>, delegate: QueryUtil.AssertValidGroupByDelegate<Extract<this, QueryUtil.AfterFromClause>, GroupByDelegateT>): QueryUtil.GroupBy<Extract<this, QueryUtil.AfterFromClause>>;
    having<HavingDelegateT extends QueryUtil.HavingDelegate<Extract<this, QueryUtil.AfterFromClause>>>(this: Extract<this, QueryUtil.AfterFromClause>, delegate: QueryUtil.AssertValidHavingDelegate<Extract<this, QueryUtil.AfterFromClause>, HavingDelegateT>): QueryUtil.Having<Extract<this, QueryUtil.AfterFromClause>>;
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
    map<DelegateT extends MapDelegate<QueryUtil.MappedType<Extract<this, QueryUtil.AfterSelectClause>>, QueryUtil.UnmappedType<Extract<this, QueryUtil.AfterSelectClause>>, any>>(this: Extract<this, QueryUtil.AfterSelectClause>, delegate: DelegateT): (QueryUtil.Map<Extract<this, QueryUtil.AfterSelectClause>, DelegateT>);
    whereIsNull<DelegateT extends QueryUtil.WhereIsNullDelegate<Extract<this, QueryUtil.AfterFromClause>>>(this: Extract<this, QueryUtil.AfterFromClause>, delegate: DelegateT): (QueryUtil.WhereIsNull<Extract<this, QueryUtil.AfterFromClause>, DelegateT>);
    whereIsNotNull<DelegateT extends QueryUtil.WhereIsNotNullDelegate<Extract<this, QueryUtil.AfterFromClause>>>(this: Extract<this, QueryUtil.AfterFromClause>, delegate: DelegateT): (QueryUtil.WhereIsNotNull<Extract<this, QueryUtil.AfterFromClause>, DelegateT>);
    whereEq<DelegateT extends QueryUtil.WhereEqDelegate<Extract<this, QueryUtil.AfterFromClause>>, ValueT extends NonNullPrimitiveExpr>(this: Extract<this, QueryUtil.AfterFromClause>, delegate: DelegateT, value: QueryUtil.AssertValidEqTarget<Extract<this, QueryUtil.AfterFromClause>, DelegateT, ValueT>): (QueryUtil.WhereEq<Extract<this, QueryUtil.AfterFromClause>, DelegateT, ValueT>);
    whereNullSafeEq<DelegateT extends QueryUtil.WhereNullSafeEqDelegate<Extract<this, QueryUtil.AfterFromClause>>, ValueT extends PrimitiveExpr>(this: Extract<this, QueryUtil.AfterFromClause>, delegate: DelegateT, value: QueryUtil.AssertValidNullSafeEqTarget<Extract<this, QueryUtil.AfterFromClause>, DelegateT, ValueT>): (QueryUtil.WhereNullSafeEq<Extract<this, QueryUtil.AfterFromClause>, DelegateT, ValueT>);
    whereEqCandidateKey<TableT extends ITable>(this: Extract<this, QueryUtil.AfterFromClause>, table: TableT & Extract<this, QueryUtil.AfterFromClause>["_joins"][number]["aliasedTable"], key: CandidateKey<TableT>): QueryUtil.WhereEqCandidateKey<Extract<this, QueryUtil.AfterFromClause>>;
    whereEqColumns<TableT extends ITable>(this: Extract<this, QueryUtil.AfterFromClause>, table: TableT & Extract<this, QueryUtil.AfterFromClause>["_joins"][number]["aliasedTable"], columns: Partial<Row<TableT>>): QueryUtil.WhereEqColumns<Extract<this, QueryUtil.AfterFromClause>>;
    useJoin<JoinDeclT extends IJoinDeclaration>(this: Extract<this, QueryUtil.AfterFromClause>, joinDecl: QueryUtil.AssertValidJoinDeclaration<Extract<this, QueryUtil.AfterFromClause>, JoinDeclT>): (QueryUtil.UseJoin<Extract<this, QueryUtil.AfterFromClause>, JoinDeclT>);
    useJoins<ArrT extends NonEmptyTuple<IJoinDeclaration>>(this: Extract<this, QueryUtil.AfterFromClause>, ...arr: QueryUtil.AssertValidJoinDeclarationArray<Extract<this, QueryUtil.AfterFromClause>, ArrT>): (QueryUtil.UseJoins<Extract<this, QueryUtil.AfterFromClause>, ArrT>);
    useJoinsUnsafe<ArrT extends NonEmptyTuple<IJoinDeclaration>>(this: Extract<this, QueryUtil.AfterFromClause>, ...arr: ArrT): (QueryUtil.UseJoins<Extract<this, QueryUtil.AfterFromClause>, ArrT>);
    assertExists(this: Extract<this, QueryUtil.MainQuery & (QueryUtil.AfterFromClause | QueryUtil.AfterSelectClause)>, connection: IConnection): Promise<void>;
    count(this: Extract<this, QueryUtil.MainQuery>, connection: IConnection): Promise<bigint>;
    cursor(this: Extract<this, QueryUtil.AfterSelectClause & QueryUtil.MainQuery>, connection: IConnection): (QueryUtil.Cursor<Extract<this, QueryUtil.AfterSelectClause & QueryUtil.MainQuery>>);
    exists(this: Extract<this, QueryUtil.MainQuery & (QueryUtil.AfterFromClause | QueryUtil.AfterSelectClause)>, connection: IConnection): Promise<boolean>;
    fetchAllUnmapped(this: Extract<this, QueryUtil.AfterSelectClause & QueryUtil.MainQuery>, connection: IConnection): (Promise<QueryUtil.FetchAllUnmapped<Extract<this, QueryUtil.AfterSelectClause & QueryUtil.MainQuery>>>);
    fetchAll(this: Extract<this, QueryUtil.AfterSelectClause & QueryUtil.MainQuery>, connection: IConnection): (Promise<QueryUtil.FetchAll<Extract<this, QueryUtil.AfterSelectClause & QueryUtil.MainQuery>>>);
    fetchOne(this: Extract<this, QueryUtil.AfterSelectClause & QueryUtil.MainQuery>, connection: IConnection): (Promise<QueryUtil.FetchOne<Extract<this, QueryUtil.AfterSelectClause & QueryUtil.MainQuery>>>);
    fetchValueArray(this: Extract<this, QueryUtil.MainQuery & QueryUtil.OneSelectItemQuery<any>>, connection: IConnection): (Promise<QueryUtil.FetchValueArray<Extract<this, QueryUtil.MainQuery & QueryUtil.OneSelectItemQuery<any>>>>);
    fetchValueOrUndefined(this: Extract<this, QueryUtil.MainQuery & QueryUtil.OneSelectItemQuery<any>>, connection: IConnection): (Promise<QueryUtil.FetchValueOrUndefined<Extract<this, QueryUtil.MainQuery & QueryUtil.OneSelectItemQuery<any>>>>);
    fetchValueOrNull(this: Extract<this, QueryUtil.MainQuery & QueryUtil.OneSelectItemQuery<any>>, connection: IConnection): (Promise<null | QueryUtil.FetchValue<Extract<this, QueryUtil.MainQuery & QueryUtil.OneSelectItemQuery<any>>>>);
    fetchValue(this: Extract<this, QueryUtil.MainQuery & QueryUtil.OneSelectItemQuery<any>>, connection: IConnection): (Promise<QueryUtil.FetchValue<Extract<this, QueryUtil.MainQuery & QueryUtil.OneSelectItemQuery<any>>>>);
    fetchZeroOrOne(this: Extract<this, QueryUtil.AfterSelectClause & QueryUtil.MainQuery>, connection: IConnection): (Promise<QueryUtil.FetchZeroOrOne<Extract<this, QueryUtil.AfterSelectClause & QueryUtil.MainQuery>>>);
    fetchOneOrNull(this: Extract<this, QueryUtil.AfterSelectClause & QueryUtil.MainQuery>, connection: IConnection): (Promise<null | QueryUtil.FetchOne<Extract<this, QueryUtil.AfterSelectClause & QueryUtil.MainQuery>>>);
    paginate(this: Extract<this, QueryUtil.AfterSelectClause & QueryUtil.MainQuery>, connection: IConnection, rawArgs: QueryUtil.RawPaginateArgs): (Promise<QueryUtil.Paginate<Extract<this, QueryUtil.AfterSelectClause & QueryUtil.MainQuery>>>);
    printSql(this: Extract<this, QueryUtil.AfterSelectClause>): this;
    printSqlPretty(this: Extract<this, QueryUtil.AfterSelectClause>): this;
    insertIgnoreInto<TableT extends ITable & {
        insertAllowed: true;
    }>(this: Extract<this, QueryUtil.AfterSelectClause>, table: TableT, delegate: InsertSelectRowDelegate<Extract<this, QueryUtil.AfterSelectClause>, TableT>): (QueryUtil.InsertIgnoreInto<Extract<this, QueryUtil.AfterSelectClause>, TableT>);
    insertInto<TableT extends ITable & {
        insertAllowed: true;
    }>(this: Extract<this, QueryUtil.AfterSelectClause>, table: TableT, delegate: InsertSelectRowDelegate<Extract<this, QueryUtil.AfterSelectClause>, TableT>): (QueryUtil.InsertInto<Extract<this, QueryUtil.AfterSelectClause>, TableT>);
    replaceInto<TableT extends ITable & {
        insertAllowed: true;
    }>(this: Extract<this, QueryUtil.AfterSelectClause>, table: TableT, delegate: InsertSelectRowDelegate<Extract<this, QueryUtil.AfterSelectClause>, TableT>): (QueryUtil.ReplaceInto<Extract<this, QueryUtil.AfterSelectClause>, TableT>);
    set<DelegateT extends UpdateUtil.SingleTableSetDelegate<Extract<this, UpdatableQuery>>>(this: (Extract<this, UpdatableQuery> & UpdateUtil.AssertValidSingleTableSetDelegate_Hack<Extract<this, UpdatableQuery>, DelegateT> & UpdateUtil.AssertValidSingleTableUpdatableQuery<Extract<this, UpdatableQuery>>), delegate: DelegateT): (QueryUtil.Set<Extract<this, UpdatableQuery>>);
    set<DelegateT extends UpdateUtil.SetDelegate<Extract<this, UpdatableQuery>>>(this: (Extract<this, UpdatableQuery> & UpdateUtil.AssertValidSetDelegate_Hack<Extract<this, UpdatableQuery>, DelegateT>), delegate: DelegateT): (QueryUtil.Set<Extract<this, UpdatableQuery>>);
    delete(this: Extract<this, DeletableQuery>, delegate: DeleteUtil.DeleteDelegate<Extract<this, DeletableQuery>>): (Delete<{
        _query: DeletableQuery;
        _tables: (ITable & {
            deleteAllowed: true;
        })[];
        _modifier: undefined;
    }>);
    deleteIgnore(this: Extract<this, DeletableQuery>, delegate: DeleteUtil.DeleteDelegate<Extract<this, DeletableQuery>>): (Delete<{
        _query: DeletableQuery;
        _tables: (ITable & {
            deleteAllowed: true;
        })[];
        _modifier: DeleteModifier.IGNORE;
    }>);
    subQuery(): QueryUtil.SubQueryResult<this>;
}
export declare function from<AliasedTableT extends IAliasedTable>(aliasedTable: QueryUtil.AssertValidJoinTarget<QueryUtil.NewInstance, AliasedTableT>): (QueryUtil.From<QueryUtil.NewInstance, AliasedTableT>);
export declare function select<SelectDelegateT extends QueryUtil.SelectDelegate<QueryUtil.NewInstance>>(delegate: QueryUtil.AssertValidSelectDelegate<QueryUtil.NewInstance, SelectDelegateT>): (QueryUtil.Select<QueryUtil.NewInstance, SelectDelegateT>);
export declare function selectExpr<SelectDelegateT extends QueryUtil.SelectExprDelegate<QueryUtil.NewInstance>>(delegate: QueryUtil.AssertValidSelectExprDelegate<QueryUtil.NewInstance, SelectDelegateT>): (QueryUtil.SelectExpr<QueryUtil.NewInstance, SelectDelegateT>);
export declare function requireParentJoins<ArrT extends NonEmptyTuple<IAliasedTable>>(...arr: QueryUtil.AssertValidParentJoins<QueryUtil.NewInstance, ArrT>): (QueryUtil.RequireParentJoins<QueryUtil.NewInstance, false, ArrT>);
export declare function requireNullableParentJoins<ArrT extends NonEmptyTuple<IAliasedTable>>(...arr: QueryUtil.AssertValidParentJoins<QueryUtil.NewInstance, ArrT>): (QueryUtil.RequireParentJoins<QueryUtil.NewInstance, true, ArrT>);
export declare type UnmappedFetchRow<QueryT extends QueryUtil.AfterSelectClause> = (QueryUtil.UnmappedType<QueryT>);
export declare type FetchRow<QueryT extends QueryUtil.AfterSelectClause> = (QueryUtil.MappedType<QueryT>);
