import {Query} from "../../query";
import {AfterFromClause, AssertUniqueJoinTarget} from "../predicate";
import {JoinFromDelegate, JoinToDelegate, invokeJoinDelegate} from "./join-delegate";
import {IAliasedTable} from "../../../aliased-table";
import {Join, JoinType} from "../../../join";

export type InnerJoin<
    QueryT extends AfterFromClause,
    AliasedTableT extends IAliasedTable
> = (
    Query<{
        readonly _distinct : QueryT["_distinct"];
        readonly _sqlCalcFoundRows : QueryT["_sqlCalcFoundRows"];

        readonly _joins : (
            QueryT["_joins"][number] |
            Join<{
                aliasedTable : AliasedTableT,
                columns : AliasedTableT["columns"],
                nullable : false,
            }>
        )[],
        readonly _parentJoins : QueryT["_parentJoins"],
        readonly _selects : QueryT["_selects"],
        readonly _where : QueryT["_where"],

        readonly _grouped : QueryT["_grouped"],
        readonly _having : QueryT["_having"],

        readonly _orders : QueryT["_orders"],
        readonly _limit : QueryT["_limit"],

        readonly _unions : QueryT["_unions"],
        readonly _unionOrders : QueryT["_unionOrders"],
        readonly _unionLimit : QueryT["_unionLimit"],

        readonly _mapDelegate : QueryT["_mapDelegate"],
    }>
);
export function innerJoin<
    QueryT extends AfterFromClause,
    AliasedTableT extends IAliasedTable,
    FromDelegateT extends JoinFromDelegate<QueryT["_joins"]>
> (
    query : QueryT,
    aliasedTable : AssertUniqueJoinTarget<QueryT, AliasedTableT>,
    fromDelegate : FromDelegateT,
    toDelegate : JoinToDelegate<QueryT, AliasedTableT, FromDelegateT>
) : (
    InnerJoin<QueryT, AliasedTableT>
) {
    const {from, to} = invokeJoinDelegate(
        query,
        aliasedTable,
        fromDelegate,
        toDelegate
    );

    const {
        _distinct,
        _sqlCalcFoundRows,

        _parentJoins,
        _selects,
        _where,

        _grouped,
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
        _joins : [
            ...query._joins,
            new Join(
                {
                    aliasedTable,
                    columns : aliasedTable.columns,
                    nullable : false,
                },
                JoinType.INNER,
                from,
                to,
            ),
        ],
        _parentJoins,
        _selects,
        _where,

        _grouped,
        _having,

        _orders,
        _limit,

        _unions,
        _unionOrders,
        _unionLimit,

        _mapDelegate,
    });
}