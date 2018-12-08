import {Query} from "../../query";
import {Join, JoinType} from "../../../join";
import {BeforeFromClause, AssertUniqueJoinTarget, assertUniqueJoinTarget} from "../predicate";
import {IAliasedTable} from "../../../aliased-table";

export type From<
    QueryT extends BeforeFromClause,
    AliasedTableT extends IAliasedTable
> = (
    Query<{
        readonly _distinct : QueryT["_distinct"];
        readonly _sqlCalcFoundRows : QueryT["_sqlCalcFoundRows"];

        readonly _joins : Join<{
            aliasedTable : AliasedTableT,
            columns : AliasedTableT["columns"],
            nullable : false,
        }>[],
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
//Must be done before any JOINs, as per MySQL
//TODO The aliasedTable must not be in parentJoins
export function from<
    QueryT extends BeforeFromClause,
    AliasedTableT extends IAliasedTable
> (
    query : QueryT,
    aliasedTable : AssertUniqueJoinTarget<QueryT, AliasedTableT>
) : (
    From<QueryT, AliasedTableT>
) {
    if (query._joins != undefined) {
        throw new Error(`FROM clause not allowed more than once`);
    }
    assertUniqueJoinTarget(query, aliasedTable);

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
            new Join(
                {
                    aliasedTable,
                    columns : aliasedTable.columns,
                    nullable : false,
                },
                JoinType.FROM,
                [],
                [],
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