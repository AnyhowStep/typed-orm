import {Query} from "../../../query";
import {AfterFromClause, CanWidenColumnTypes, canWidenColumnTypes, AssertValidJoinTarget} from "../../predicate";
import {JoinFromDelegate, JoinToDelegate, join} from "./join";
import {IAliasedTable} from "../../../../aliased-table";
import {Join, JoinType} from "../../../../join";
import {JoinArrayUtil} from "../../../../join-array";

/*
    We don't allow RIGHT JOIN after SELECT, WHERE, HAVING,
    ORDER BY, and UNION'S ORDER BY clauses
    because they rely on data types not widening in their expressions.

    Consider the following,

    from(data)
        //At this point, c.x is of type `number`
        .where(c => {
            //(x + 5) > 42
            return gt(
                add(c.x, 5),
                42
            );
        })
        //At this point, c.x is of type `number|null`
        //because a RIGHT JOIN makes all columns in `data` nullable
        .rightJoinUsing(
            other,
            c => [c.otherId]
        );

    Now, we run the risk of `x+5` being of type `NULL`.
    Comparisons/operations with `NULL` tend to have undesirable
    effects and we want to avoid them as much as possible.

    -----

    Consider the following,

    from(data)
        //At this point, c.x is of type `number`
        .orderBy(c => [
            add(c.x, 5)
        ])
        //At this point, c.x is of type `number|null`
        //because a RIGHT JOIN makes all columns in `data` nullable
        .rightJoinUsing(
            other,
            c => [c.otherId]
        );

    Instead of ordering by a `number`, we now order by `number|null`...
    And we know how NULL is with ASC/DESC sorting, not fun.
*/
export type RightJoin<
    QueryT extends AfterFromClause & CanWidenColumnTypes,
    AliasedTableT extends IAliasedTable
> = (
    Query<{
        readonly _distinct : QueryT["_distinct"];
        readonly _sqlCalcFoundRows : QueryT["_sqlCalcFoundRows"];

        readonly _joins : (
            JoinArrayUtil.ToNullable<QueryT["_joins"]>[number] |
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
export function rightJoin<
    QueryT extends AfterFromClause & CanWidenColumnTypes,
    AliasedTableT extends IAliasedTable,
    FromDelegateT extends JoinFromDelegate<QueryT["_joins"]>
> (
    query : QueryT,
    aliasedTable : AssertValidJoinTarget<QueryT, AliasedTableT>,
    fromDelegate : FromDelegateT,
    toDelegate : JoinToDelegate<QueryT, AliasedTableT, FromDelegateT>
) : (
    RightJoin<QueryT, AliasedTableT>
) {
    if (!canWidenColumnTypes(query)) {
        throw new Error(`Cannot use RIGHT JOIN here`);
    }
    const {
        _distinct,
        _sqlCalcFoundRows,

        _joins,
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
    } = join<
        QueryT,
        AliasedTableT,
        FromDelegateT,
        false
    >(
        query,
        aliasedTable,
        fromDelegate,
        toDelegate,
        false,
        JoinType.RIGHT
    );

    //Pretty sure the last join is the one right join we just
    //added
    const lastJoin = _joins[_joins.length-1] as Join<{
        aliasedTable : AliasedTableT,
        columns : AliasedTableT["columns"],
        nullable : false,
    }>;

    return new Query({
        _distinct,
        _sqlCalcFoundRows,

        _joins : [
            ...JoinArrayUtil.toNullable(query._joins as QueryT["_joins"]),
            lastJoin,
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