import {IQuery, Query} from "../../query";
import {IAliasedTable} from "../../../aliased-table";
import {IJoin, Join, JoinType} from "../../../join";
import {AssertUniqueJoinTargetImpl, assertUniqueJoinTarget} from "../predicate";
import {NonEmptyTuple} from "../../../tuple";

export type ToParentJoins<
    NullableT extends boolean,
    AliasedTableT extends IAliasedTable
> = (
    AliasedTableT extends IAliasedTable ?
    IJoin<{
        aliasedTable : AliasedTableT,
        columns : AliasedTableT["columns"],
        nullable : NullableT,
    }> :
    never
);

export type RequireParentJoins<
    QueryT extends IQuery,
    NullableT extends boolean,
    ArrT extends NonEmptyTuple<IAliasedTable>
> = (
    Query<{
        readonly _distinct : QueryT["_distinct"];
        readonly _sqlCalcFoundRows : QueryT["_sqlCalcFoundRows"];

        readonly _joins : QueryT["_joins"],
        readonly _parentJoins : (
            QueryT["_parentJoins"] extends IJoin[] ?
            (
                QueryT["_parentJoins"][number] |
                ToParentJoins<NullableT, ArrT[number]>
            )[] :
            ToParentJoins<NullableT, ArrT[number]>[]
        ),
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

export type AssertValidParentJoins<
    QueryT extends IQuery,
    ArrT extends NonEmptyTuple<IAliasedTable>
> = (
    ArrT &
    AssertUniqueJoinTargetImpl<QueryT, ArrT[number]>
);

/*
    Although not necessary, prevent duplicates in this ArrT?
*/
export function requireParentJoins<
    QueryT extends IQuery,
    NullableT extends boolean,
    ArrT extends NonEmptyTuple<IAliasedTable>
> (
    query : QueryT,
    nullable : NullableT,
    ...arr : AssertValidParentJoins<QueryT, ArrT>
) : (
    RequireParentJoins<
        QueryT,
        NullableT,
        ArrT
    >
) {
    for (let aliasedTable of arr) {
        assertUniqueJoinTarget(query, aliasedTable);
    }
    const parentJoins = arr.map(aliasedTable => new Join(
        {
            aliasedTable,
            columns : aliasedTable.columns,
            nullable,
        },
        //It doesn't matter what type of Join this is.
        //It should never affect output.
        JoinType.INNER,
        [],
        []
    ));

    const {
        _distinct,
        _sqlCalcFoundRows,

        _joins,
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

        _joins,
        _parentJoins : (
            (query._parentJoins == undefined) ?
            parentJoins :
            [...query._parentJoins, ...parentJoins]
        ) as (
            QueryT["_parentJoins"] extends IJoin[] ?
            (
                QueryT["_parentJoins"][number] |
                ToParentJoins<NullableT, ArrT[number]>
            )[] :
            ToParentJoins<NullableT, ArrT[number]>[]
        ),
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