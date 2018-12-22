import {IJoin} from "../join";
import {IAliasedTable} from "../aliased-table";
import {SelectItem} from "../select-item";
import {IAnonymousTypedExpr} from "../expr";
import * as QueryUtil from "./util";
import {ColumnIdentifier} from "../column-identifier";
import {Order} from "../order";
import {MapDelegate} from "../map-delegate";
import { DISTINCT } from "../constants";
import {NonEmptyTuple} from "../tuple";

export interface UnionQuery {
    //Defaults to true
    readonly distinct : boolean,
    readonly query : QueryUtil.AfterSelectClause,
}
//TODO consider allowing this to be bigint?
//A maxRowCount/offset of 3.141 would be weird
export interface LimitData {
    //This is called "max"RowCount and not rowCount
    //(like MySQL calls it) because we can say
    //we want a maxRowCount of 10 and only get 3 rows.
    //Or a maxRowCount of 1 and get zero rows.
    readonly maxRowCount : number,
    readonly offset   : number,
}
/*
    TODO Implement support for SQL_MODE=ONLY_FULL_GROUP_BY
    Supporting it will increase compile-time safety for queries.
    I don't know enough to implement this at the moment.

    Reject queries for which the

    + select list,
    + HAVING condition, or
    + ORDER BY list

    refer to nonaggregated columns that are neither

    1. named in the GROUP BY clause nor are
    2. functionally dependent on (uniquely determined by) GROUP BY columns.

    Part 1 seems "easy" enough.
    Part 2 is the challenging part.
    I *think* I have to look at the GROUP BY columns
    and also look at the candidate keys of the tables.

    1. If the GROUP BY columns are a super-set of any candidate key of a table,
    then we can refer to any column of the table.

    2. If the GROUP BY columns are used in the ON clause of a JOIN,
    then the columns they are equal to are also part of the GROUP BY columns.

    SELECT
        app.name
    FROM
        app
    JOIN
        user
    ON
        app.appId = user.appId
    GROUP BY
        user.appId

    In the above example, user.appId is in the GROUP BY columns.
    But we also have app.appId = user.appId in the ON clause.

    So, app.appId is implicitly part of the GROUP BY columns.

    And because app.appId is a super-set of a candidate key of the table app,
    then we can refer to any column of the app table.

    It seems like if I want to implement ONLY_FULL_GROUP_BY support,
    I'll need to also strongly type the ON clause of IJoin.

    My life is not going to be easy =/

    -----

    TODO Disable aggregate functions in WHERE clause
    This can probably be achieved by tagging certain interfaces with
    a `usesAggregateFunction` field.

    TODO
    Type narrowing where expressions
        + Same with WHERE, implemented internally with WHERE
    DISTINCT
        + Loose type (boolean)
    SQL_CALC_FOUND_ROWS
        + Loose type (boolean)
    FROM
        + Tight type
    JOIN
        + Tight type
        + Must be done after FROM clause
        + Uses joins
    SELECT
        + Tight type
        + Must be done after FROM clause
        + Uses joins/parentJoins
    WHERE
        + Loose type (IAnonymousTypedExpr<boolean>, undefined)
        + Must be done after FROM clause
        + Uses joins
        + Aggregate functions NOT allowed
    GROUP_BY
        + Loose type (ColumnIdentifier[], undefined)
        + Must be done after FROM clause
        + Uses joins and selects
    HAVING
        + Loose type (IAnonymousTypedExpr<boolean>, undefined)
        + Must be done after FROM clause
        + Uses joins and selects
        + Aggregate functions allowed
        + TECHNICALLY, can only use columns in GROUP BY,
          or columns in aggregate functions,
          But MySQL supports an extension that allows columns from SELECT
          As such, this library does not check for valid columns here
    ORDER_BY
        + Loose type (Order[], undefined)
          The actual type is a bit more complicated, it may allow a tuple
          with ASCENDING or DESCENDING
        + Must be done after FROM clause

          You can technically call this before FROM clause but
          there's little point in doing it... Why order one row?

        + Uses joins and selects
    LIMIT
        + Tight type
          Required so we know this query has a maxRowCount of 1
    UNION
        + Loose type (UnionQuery[], undefined)
        + Must be done after SELECT clause
        + Selected columns of UNION must match SELECT clause
    UNION's ORDER BY (Uses selects)
        + Loose type (Order[], undefined)
          The actual type is a bit more complicated, it may allow a tuple
          with ASCENDING or DESCENDING
        + Must be done after FROM or UNION clause

          The rationale is that we want to order *more than one row*.
          We are guaranteed more than one row after a FROM or UNION.

        + Uses selects
    UNION's LIMIT
        + Tight type
          Required so we know this query has a maxRowCount of 1
    Post-query map delegates
        + Must be done after SELECT clause
*/
export interface QueryData {
    /*
        Prefixed with underscore because, in general,
        you shouldn't need to access these fields directly.

        But if you need to, they're there.
    */
    readonly _distinct : boolean;
    readonly _sqlCalcFoundRows : boolean;

    readonly _joins : IJoin[]|undefined;
    readonly _parentJoins : IJoin[]|undefined;
    readonly _selects : SelectItem[]|undefined;
    readonly _where : IAnonymousTypedExpr<boolean>|undefined;

    //GROUP BY clause columns
    //They are properly referred to as "aggregated columns"
    readonly _grouped : ColumnIdentifier[]|undefined;
    readonly _having : IAnonymousTypedExpr<boolean>|undefined;

    readonly _orders : Order[]|undefined;
    readonly _limit : LimitData|undefined;

    readonly _unions : UnionQuery[]|undefined;
    readonly _unionOrders : Order[]|undefined;
    readonly _unionLimit : LimitData|undefined;

    readonly _mapDelegate : MapDelegate|undefined;
}
export interface IQuery<DataT extends QueryData=QueryData> {
    readonly _distinct : DataT["_distinct"];
    readonly _sqlCalcFoundRows : DataT["_sqlCalcFoundRows"];

    readonly _joins : DataT["_joins"];
    readonly _parentJoins : DataT["_parentJoins"];
    readonly _selects : DataT["_selects"];
    readonly _where : DataT["_where"];

    readonly _grouped : DataT["_grouped"];
    readonly _having : DataT["_having"];

    readonly _orders : DataT["_orders"];
    readonly _limit : DataT["_limit"];

    readonly _unions : DataT["_unions"];
    readonly _unionOrders : DataT["_unionOrders"];
    readonly _unionLimit : DataT["_unionLimit"];

    readonly _mapDelegate : DataT["_mapDelegate"];
}
export class Query<DataT extends QueryData> {
    readonly _distinct : DataT["_distinct"];
    readonly _sqlCalcFoundRows : DataT["_sqlCalcFoundRows"];

    readonly _joins : DataT["_joins"];
    readonly _parentJoins : DataT["_parentJoins"];
    readonly _selects : DataT["_selects"];
    readonly _where : DataT["_where"];

    readonly _grouped : DataT["_grouped"];
    readonly _having : DataT["_having"];

    readonly _orders : DataT["_orders"];
    readonly _limit : DataT["_limit"];

    readonly _unions : DataT["_unions"];
    readonly _unionOrders : DataT["_unionOrders"];
    readonly _unionLimit : DataT["_unionLimit"];

    readonly _mapDelegate : DataT["_mapDelegate"];

    public constructor (data : DataT) {
        this._distinct = data._distinct;
        this._sqlCalcFoundRows = data._sqlCalcFoundRows;

        this._joins = data._joins;
        this._parentJoins = data._parentJoins;
        this._selects = data._selects;
        this._where = data._where;

        this._grouped = data._grouped;
        this._having = data._having;

        this._orders = data._orders;
        this._limit = data._limit;

        this._unions = data._unions;
        this._unionOrders = data._unionOrders;
        this._unionLimit = data._unionLimit;

        this._mapDelegate = data._mapDelegate;
    }

    public from<
        AliasedTableT extends IAliasedTable
    > (
        this : Extract<this, QueryUtil.BeforeFromClause>,
        aliasedTable : QueryUtil.AssertValidJoinTarget<
            Extract<this, QueryUtil.BeforeFromClause>,
            AliasedTableT
        >
    ) : (
        QueryUtil.From<
            Extract<this, QueryUtil.BeforeFromClause>,
            AliasedTableT
        >
    ) {
        return QueryUtil.from<
            Extract<this, QueryUtil.BeforeFromClause>,
            AliasedTableT
        >(
            this,
            aliasedTable
        );
    }

    public innerJoin<
        AliasedTableT extends IAliasedTable,
        FromDelegateT extends QueryUtil.JoinFromDelegate<
            Extract<this, QueryUtil.AfterFromClause>["_joins"]
        >
    > (
        this : Extract<this, QueryUtil.AfterFromClause>,
        aliasedTable : QueryUtil.AssertValidJoinTarget<
            Extract<this, QueryUtil.AfterFromClause>,
            AliasedTableT
        >,
        fromDelegate : FromDelegateT,
        toDelegate : QueryUtil.JoinToDelegate<
            Extract<this, QueryUtil.AfterFromClause>,
            AliasedTableT,
            FromDelegateT
        >
    ) : (
        QueryUtil.InnerJoin<
            Extract<this, QueryUtil.AfterFromClause>,
            AliasedTableT
        >
    ) {
        return QueryUtil.innerJoin<
            Extract<this, QueryUtil.AfterFromClause>,
            AliasedTableT,
            FromDelegateT
        >(
            this,
            aliasedTable,
            fromDelegate,
            toDelegate
        );
    }
    public leftJoin<
        AliasedTableT extends IAliasedTable,
        FromDelegateT extends QueryUtil.JoinFromDelegate<
            Extract<this, QueryUtil.AfterFromClause>["_joins"]
        >
    > (
        this : Extract<this, QueryUtil.AfterFromClause>,
        aliasedTable : QueryUtil.AssertValidJoinTarget<
            Extract<this, QueryUtil.AfterFromClause>,
            AliasedTableT
        >,
        fromDelegate : FromDelegateT,
        toDelegate : QueryUtil.JoinToDelegate<
            Extract<this, QueryUtil.AfterFromClause>,
            AliasedTableT,
            FromDelegateT
        >
    ) : (
        QueryUtil.LeftJoin<
            Extract<this, QueryUtil.AfterFromClause>,
            AliasedTableT
        >
    ) {
        return QueryUtil.leftJoin<
            Extract<this, QueryUtil.AfterFromClause>,
            AliasedTableT,
            FromDelegateT
        >(
            this,
            aliasedTable,
            fromDelegate,
            toDelegate
        );
    }
    public rightJoin<
        AliasedTableT extends IAliasedTable,
        FromDelegateT extends QueryUtil.JoinFromDelegate<
            Extract<this, QueryUtil.AfterFromClause>["_joins"]
        >
    > (
        this : Extract<this, QueryUtil.AfterFromClause>,
        aliasedTable : QueryUtil.AssertValidJoinTarget<
            Extract<this, QueryUtil.AfterFromClause>,
            AliasedTableT
        >,
        fromDelegate : FromDelegateT,
        toDelegate : QueryUtil.JoinToDelegate<
            Extract<this, QueryUtil.AfterFromClause>,
            AliasedTableT,
            FromDelegateT
        >
    ) : (
        QueryUtil.RightJoin<
            Extract<this, QueryUtil.AfterFromClause>,
            AliasedTableT
        >
    ) {
        return QueryUtil.rightJoin<
            Extract<this, QueryUtil.AfterFromClause>,
            AliasedTableT,
            FromDelegateT
        >(
            this,
            aliasedTable,
            fromDelegate,
            toDelegate
        );
    }

    public innerJoinUsing<
        AliasedTableT extends IAliasedTable,
        UsingDelegateT extends QueryUtil.JoinUsingDelegate<Extract<this, QueryUtil.AfterFromClause>["_joins"], AliasedTableT>
    > (
        this : Extract<this, QueryUtil.AfterFromClause>,
        aliasedTable : QueryUtil.AssertValidJoinTarget<Extract<this, QueryUtil.AfterFromClause>, AliasedTableT>,
        usingDelegate : UsingDelegateT
    ) : (
        QueryUtil.InnerJoin<Extract<this, QueryUtil.AfterFromClause>, AliasedTableT>
    ) {
        return QueryUtil.innerJoinUsing<
            Extract<this, QueryUtil.AfterFromClause>,
            AliasedTableT,
            UsingDelegateT
        >(
            this,
            aliasedTable,
            usingDelegate
        );
    }

    public leftJoinUsing<
        AliasedTableT extends IAliasedTable,
        UsingDelegateT extends QueryUtil.JoinUsingDelegate<Extract<this, QueryUtil.AfterFromClause>["_joins"], AliasedTableT>
    > (
        this : Extract<this, QueryUtil.AfterFromClause>,
        aliasedTable : QueryUtil.AssertValidJoinTarget<Extract<this, QueryUtil.AfterFromClause>, AliasedTableT>,
        usingDelegate : UsingDelegateT
    ) : (
        QueryUtil.LeftJoin<Extract<this, QueryUtil.AfterFromClause>, AliasedTableT>
    ) {
        return QueryUtil.leftJoinUsing<
            Extract<this, QueryUtil.AfterFromClause>,
            AliasedTableT,
            UsingDelegateT
        >(
            this,
            aliasedTable,
            usingDelegate
        );
    }

    public rightJoinUsing<
        AliasedTableT extends IAliasedTable,
        UsingDelegateT extends QueryUtil.JoinUsingDelegate<Extract<this, QueryUtil.AfterFromClause>["_joins"], AliasedTableT>
    > (
        this : Extract<this, QueryUtil.AfterFromClause>,
        aliasedTable : QueryUtil.AssertValidJoinTarget<Extract<this, QueryUtil.AfterFromClause>, AliasedTableT>,
        usingDelegate : UsingDelegateT
    ) : (
        QueryUtil.RightJoin<Extract<this, QueryUtil.AfterFromClause>, AliasedTableT>
    ) {
        return QueryUtil.rightJoinUsing<
            Extract<this, QueryUtil.AfterFromClause>,
            AliasedTableT,
            UsingDelegateT
        >(
            this,
            aliasedTable,
            usingDelegate
        );
    }

    select<
        SelectDelegateT extends QueryUtil.SelectDelegate<
            Extract<this, QueryUtil.BeforeUnionClause>
        >
    > (
        this : Extract<this, QueryUtil.BeforeUnionClause>,
        delegate : QueryUtil.AssertValidSelectDelegate<
            Extract<this, QueryUtil.BeforeUnionClause>,
            SelectDelegateT
        >
    ) : (
        QueryUtil.Select<
            Extract<this, QueryUtil.BeforeUnionClause>,
            SelectDelegateT
        >
    ) {
        return QueryUtil.select<
            Extract<this, QueryUtil.BeforeUnionClause>,
            SelectDelegateT
        >(
            this,
            delegate
        );
    }

    selectExpr<
        SelectDelegateT extends QueryUtil.SelectExprDelegate<
            Extract<this, QueryUtil.BeforeUnionClause & QueryUtil.BeforeSelectClause>
        >
    > (
        this : Extract<this, QueryUtil.BeforeUnionClause & QueryUtil.BeforeSelectClause>,
        delegate : QueryUtil.AssertValidSelectExprDelegate<
            Extract<this, QueryUtil.BeforeUnionClause & QueryUtil.BeforeSelectClause>,
            SelectDelegateT
        >
    ) : (
        QueryUtil.SelectExpr<
            Extract<this, QueryUtil.BeforeUnionClause & QueryUtil.BeforeSelectClause>,
            SelectDelegateT
        >
    ) {
        return QueryUtil.selectExpr<
            Extract<this, QueryUtil.BeforeUnionClause & QueryUtil.BeforeSelectClause>,
            SelectDelegateT
        >(
            this,
            delegate
        );
    }

    andWhere<
        AndWhereDelegateT extends QueryUtil.AndWhereDelegate<
            Extract<this, QueryUtil.AfterFromClause>
        >
    > (
        this : Extract<this, QueryUtil.AfterFromClause>,
        delegate : QueryUtil.AssertValidAndWhereDelegate<
            Extract<this, QueryUtil.AfterFromClause>,
            AndWhereDelegateT
        >
    ) : QueryUtil.AndWhere<Extract<this, QueryUtil.AfterFromClause>> {
        return QueryUtil.andWhere<
            Extract<this, QueryUtil.AfterFromClause>,
            AndWhereDelegateT
        >(this, delegate);
    }

    groupBy<
        GroupByDelegateT extends QueryUtil.GroupByDelegate<
            Extract<this, QueryUtil.AfterFromClause>
        >
    > (
        this : Extract<this, QueryUtil.AfterFromClause>,
        delegate : QueryUtil.AssertValidGroupByDelegate<
            Extract<this, QueryUtil.AfterFromClause>,
            GroupByDelegateT
        >
    ) : QueryUtil.GroupBy<Extract<this, QueryUtil.AfterFromClause>> {
        return QueryUtil.groupBy<
            Extract<this, QueryUtil.AfterFromClause>,
            GroupByDelegateT
        >(this, delegate);
    }

    andHaving<
        AndHavingDelegateT extends QueryUtil.AndHavingDelegate<
            Extract<this, QueryUtil.AfterFromClause>
        >
    > (
        this : Extract<this, QueryUtil.AfterFromClause>,
        delegate : QueryUtil.AssertValidAndHavingDelegate<
            Extract<this, QueryUtil.AfterFromClause>,
            AndHavingDelegateT
        >
    ) : QueryUtil.AndHaving<Extract<this, QueryUtil.AfterFromClause>> {
        return QueryUtil.andHaving<
            Extract<this, QueryUtil.AfterFromClause>,
            AndHavingDelegateT
        >(this, delegate);
    }

    orderBy<
        OrderByDelegateT extends QueryUtil.OrderByDelegate<
            Extract<this, QueryUtil.AfterFromClause>
        >
    > (
        this : Extract<this, QueryUtil.AfterFromClause>,
        delegate : QueryUtil.AssertValidOrderByDelegate<
            Extract<this, QueryUtil.AfterFromClause>,
            OrderByDelegateT
        >
    ) : QueryUtil.OrderBy<Extract<this, QueryUtil.AfterFromClause>> {
        return QueryUtil.orderBy<
            Extract<this, QueryUtil.AfterFromClause>,
            OrderByDelegateT
        >(this, delegate);
    }

    /*
        One should be careful about using LIMIT, OFFSET
        without an ORDER BY clause.

        In general, if your WHERE condition uniquely identifies
        the row, then LIMIT and OFFSET are not required
        and can be safely used without an ORDER BY.

        The problem is when the WHERE condition *does not*
        uniquely identify a row.

        Then, LIMIT and OFFSET can return inconsistent results.
    */
    limit<MaxRowCountT extends number> (
        maxRowCount : MaxRowCountT
    ) : QueryUtil.Limit<this, MaxRowCountT> {
        return QueryUtil.limit(this, maxRowCount);
    }
    offset<OffsetT extends number> (
        offset : OffsetT
    ) : QueryUtil.Offset<this, OffsetT> {
        return QueryUtil.offset(this, offset);
    }

    union<OtherT extends QueryUtil.AfterSelectClause>(
        this : Extract<this, QueryUtil.AfterSelectClause>,
        other : QueryUtil.AssertUnionCompatibleQuery<
            Extract<this, QueryUtil.AfterSelectClause>,
            OtherT
        >
    ) : QueryUtil.Union<Extract<this, QueryUtil.AfterSelectClause>>;
    union<OtherT extends QueryUtil.AfterSelectClause>(
        this : Extract<this, QueryUtil.AfterSelectClause>,
        unionType : QueryUtil.UnionType,
        other : QueryUtil.AssertUnionCompatibleQuery<
            Extract<this, QueryUtil.AfterSelectClause>,
            OtherT
        >
    ) : QueryUtil.Union<Extract<this, QueryUtil.AfterSelectClause>>;
    union<OtherT extends QueryUtil.AfterSelectClause> (this : Extract<this, QueryUtil.AfterSelectClause>, arg0 : any, arg1? : any) {
        if (arg1 == undefined) {
            //Only two args
            const other : QueryUtil.AssertUnionCompatibleQuery<
                Extract<this, QueryUtil.AfterSelectClause>,
                OtherT
            > = arg0;
            return QueryUtil.union<
                Extract<this, QueryUtil.AfterSelectClause>,
                OtherT
            >(this, other, DISTINCT);
        } else {
            //Three args
            //Yeap, it's arg*1*, then arg*0*.
            //Confusing. I know. I'm sorry.
            const other : QueryUtil.AssertUnionCompatibleQuery<
                Extract<this, QueryUtil.AfterSelectClause>,
                OtherT
            > = arg1;
            const unionType : QueryUtil.UnionType = arg0;
            return QueryUtil.union<
                Extract<this, QueryUtil.AfterSelectClause>,
                OtherT
            >(this, other, unionType);
        }
    }

    unionOrderBy<
        UnionOrderByDelegateT extends QueryUtil.UnionOrderByDelegate<
            Extract<this, QueryUtil.AfterSelectClause & (QueryUtil.AfterFromClause|QueryUtil.AfterUnionClause)>
        >
    > (
        this : Extract<this, QueryUtil.AfterSelectClause & (QueryUtil.AfterFromClause|QueryUtil.AfterUnionClause)>,
        delegate : QueryUtil.AssertValidUnionOrderByDelegate<
            Extract<this, QueryUtil.AfterSelectClause & (QueryUtil.AfterFromClause|QueryUtil.AfterUnionClause)>,
            UnionOrderByDelegateT
        >
    ) : QueryUtil.UnionOrderBy<
    Extract<this, QueryUtil.AfterSelectClause & (QueryUtil.AfterFromClause|QueryUtil.AfterUnionClause)>
    > {
        return QueryUtil.unionOrderBy<
            Extract<this, QueryUtil.AfterSelectClause & (QueryUtil.AfterFromClause|QueryUtil.AfterUnionClause)>,
            UnionOrderByDelegateT
        >(this, delegate);
    }

    /*
        One should be careful about using UNION LIMIT, OFFSET
        without the UNION ORDER BY clause.
    */
    unionLimit<MaxRowCountT extends number> (
        maxRowCount : MaxRowCountT
    ) : QueryUtil.UnionLimit<this, MaxRowCountT> {
        return QueryUtil.unionLimit(this, maxRowCount);
    }
    unionOffset<OffsetT extends number> (
        offset : OffsetT
    ) : QueryUtil.UnionOffset<this, OffsetT> {
        return QueryUtil.unionOffset(this, offset);
    }

    distinct (
        this : Extract<this, QueryUtil.AfterSelectClause>
    ) : QueryUtil.Distinct<Extract<this, QueryUtil.AfterSelectClause>> {
        return QueryUtil.distinct(this);
    }
    sqlCalcFoundRows (
        this : Extract<this, QueryUtil.AfterSelectClause>
    ) : QueryUtil.SqlCalcFoundRows<Extract<this, QueryUtil.AfterSelectClause>> {
        return QueryUtil.sqlCalcFoundRows(this);
    }

    crossJoin<
        AliasedTableT extends IAliasedTable
    > (
        this : Extract<this, QueryUtil.AfterFromClause>,
        aliasedTable : QueryUtil.AssertValidJoinTarget<
            Extract<this, QueryUtil.AfterFromClause>,
            AliasedTableT
        >
    ) : (
        QueryUtil.CrossJoin<
            Extract<this, QueryUtil.AfterFromClause>,
            AliasedTableT
        >
    ) {
        return QueryUtil.crossJoin<
            Extract<this, QueryUtil.AfterFromClause>,
            AliasedTableT
        >(
            this,
            aliasedTable
        );
    }

    requireParentJoins<
        ArrT extends NonEmptyTuple<IAliasedTable>
    > (
        ...arr : QueryUtil.AssertValidParentJoins<this, ArrT>
    ) : (
        QueryUtil.RequireParentJoins<
            this,
            false,
            ArrT
        >
    ) {
        return QueryUtil.requireParentJoins<
            this,
            false,
            ArrT
        >(
            this,
            false,
            //TODO Figure out what's wrong
            ...(arr as any)
        );
    }
    requireNullableParentJoins<
        ArrT extends NonEmptyTuple<IAliasedTable>
    > (
        ...arr : QueryUtil.AssertValidParentJoins<this, ArrT>
    ) : (
        QueryUtil.RequireParentJoins<
            this,
            true,
            ArrT
        >
    ) {
        return QueryUtil.requireParentJoins<
            this,
            true,
            ArrT
        >(
            this,
            true,
            //TODO Figure out what's wrong
            ...(arr as any)
        );
    }
    as<AliasT extends string> (
        this : QueryUtil.AssertAliasableQuery<
            Extract<this, QueryUtil.AfterSelectClause>
        >,
        alias : AliasT
    ) : (
        QueryUtil.As<
            Extract<this, QueryUtil.AfterSelectClause>,
            AliasT
        >
    ) {
        return QueryUtil.as<
            Extract<this, QueryUtil.AfterSelectClause>,
            AliasT
        >(this, alias);
    }
}

export function from<AliasedTableT extends IAliasedTable> (
    aliasedTable : QueryUtil.AssertValidJoinTarget<
        QueryUtil.NewInstance,
        AliasedTableT
    >
) : (
    QueryUtil.From<QueryUtil.NewInstance, AliasedTableT>
) {
    return QueryUtil.newInstance()
        .from<AliasedTableT>(aliasedTable);
}
export function select<
    SelectDelegateT extends QueryUtil.SelectDelegate<
        QueryUtil.NewInstance
    >
> (
    delegate : QueryUtil.AssertValidSelectDelegate<
        QueryUtil.NewInstance,
        SelectDelegateT
    >
) : (
    QueryUtil.Select<
        QueryUtil.NewInstance,
        SelectDelegateT
    >
) {
    return QueryUtil.newInstance()
        .select(delegate);
}
export function selectExpr<
    SelectDelegateT extends QueryUtil.SelectExprDelegate<
        QueryUtil.NewInstance
    >
> (
    delegate : QueryUtil.AssertValidSelectExprDelegate<
        QueryUtil.NewInstance,
        SelectDelegateT
    >
) : (
    QueryUtil.SelectExpr<
        QueryUtil.NewInstance,
        SelectDelegateT
    >
) {
    return QueryUtil.newInstance()
        .selectExpr(delegate);
}
export function requireParentJoins<
    ArrT extends NonEmptyTuple<IAliasedTable>
> (
    ...arr : QueryUtil.AssertValidParentJoins<QueryUtil.NewInstance, ArrT>
) : (
    QueryUtil.RequireParentJoins<
        QueryUtil.NewInstance,
        false,
        ArrT
    >
) {
    return QueryUtil.newInstance()
        .requireParentJoins<ArrT>(...(arr as any));
}
export function requireNullableParentJoins<
    ArrT extends NonEmptyTuple<IAliasedTable>
> (
    ...arr : QueryUtil.AssertValidParentJoins<QueryUtil.NewInstance, ArrT>
) : (
    QueryUtil.RequireParentJoins<
        QueryUtil.NewInstance,
        true,
        ArrT
    >
) {
    return QueryUtil.newInstance()
        .requireNullableParentJoins<ArrT>(...(arr as any));
}