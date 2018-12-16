import {Query} from "../../query";
import {AfterFromClause} from "../predicate";
import {NonEmptyTuple} from "../../../tuple";
import {ColumnIdentifier, ColumnIdentifierUtil} from "../../../column-identifier";
import {ColumnIdentifierRefUtil} from "../../../column-identifier-ref";

export type GroupByDelegate<
    QueryT extends AfterFromClause
> = (
    (
        columns : ColumnIdentifierRefUtil.ToConvenient<
            ColumnIdentifierRefUtil.FromQuery<QueryT>
        >
    ) => NonEmptyTuple<ColumnIdentifierUtil.FromQuery<QueryT>>
);
export type GroupBy<
    QueryT extends AfterFromClause,
    //This will only be used when pursuing ONLY_FULL_GROUP_BY support
    //GroupByDelegateT extends GroupByDelegate<QueryT>
> = (
    Query<{
        readonly _distinct : QueryT["_distinct"];
        readonly _sqlCalcFoundRows : QueryT["_sqlCalcFoundRows"];

        readonly _joins : QueryT["_joins"],
        readonly _parentJoins : QueryT["_parentJoins"],
        readonly _selects : QueryT["_selects"],
        readonly _where : QueryT["_where"],

        //TODO Debate making this more strongly typed?
        //It will be necessary when pursuing ONLY_FULL_GROUP_BY support
        readonly _grouped : ColumnIdentifier[],
        readonly _having : QueryT["_having"],

        readonly _orders : QueryT["_orders"],
        readonly _limit : QueryT["_limit"],

        readonly _unions : QueryT["_unions"],
        readonly _unionOrders : QueryT["_unionOrders"],
        readonly _unionLimit : QueryT["_unionLimit"],

        readonly _mapDelegate : QueryT["_mapDelegate"],
    }>
);
export type AssertValidGroupByDelegate<
    QueryT extends AfterFromClause,
    GroupByDelegateT extends GroupByDelegate<QueryT>
> = (
    GroupByDelegateT &
    (
        //Column identifiers to group by must exist
        ReturnType<GroupByDelegateT>[number] extends ColumnIdentifierUtil.FromQuery<QueryT> ?
        unknown :
        [
            "Invalid GROUP BY columns",
            ReturnType<GroupByDelegateT>,
            ColumnIdentifierUtil.FromQuery<QueryT>,
            Exclude<
                ReturnType<GroupByDelegateT>[number],
                ColumnIdentifierUtil.FromQuery<QueryT>
            >
        ]
    )
);
export function groupBy<
    QueryT extends AfterFromClause,
    GroupByDelegateT extends GroupByDelegate<QueryT>
> (
    query : QueryT,
    delegate : AssertValidGroupByDelegate<QueryT, GroupByDelegateT>
) : GroupBy<QueryT> {
    const queryRef = ColumnIdentifierRefUtil.fromQuery(query);
    const grouped = delegate(
        ColumnIdentifierRefUtil.toConvenient(queryRef)
    );

    ColumnIdentifierRefUtil.assertHasColumnIdentifiers(queryRef, grouped as ColumnIdentifier[]);

    const newGrouped : ColumnIdentifier[] = (
        (query._grouped == undefined) ?
            grouped :
            [...query._grouped, ...grouped]
    ) as any;

    const {
        _distinct,
        _sqlCalcFoundRows,

        _joins,
        _parentJoins,
        _selects,
        _where,

        _having,

        _orders,
        _limit,

        _unions,
        _unionOrders,
        _unionLimit,

        _mapDelegate,
    } = query;

    return new Query({
        _distinct,
        _sqlCalcFoundRows,

        _joins,
        _parentJoins,
        _selects,
        _where,

        _grouped : newGrouped,
        _having,

        _orders,
        _limit,

        _unions,
        _unionOrders,
        _unionLimit,

        _mapDelegate,
    });
}