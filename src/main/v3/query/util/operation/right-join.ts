import {Query} from "../../query";
import {AfterFromClause, AssertUniqueJoinTarget} from "../predicate";
import {JoinFromDelegate, JoinToDelegate, invokeJoinDelegate} from "./join-delegate";
import {IAliasedTable} from "../../../aliased-table";
import {Join, JoinType} from "../../../join";
import {JoinArrayUtil} from "../../../join-array";

export type RightJoin<
    QueryT extends AfterFromClause,
    AliasedTableT extends IAliasedTable
> = (
    Query<{
        readonly joins : (
            JoinArrayUtil.ToNullable<QueryT["joins"]>[number] |
            Join<{
                aliasedTable : AliasedTableT,
                columns : AliasedTableT["columns"],
                nullable : false,
            }>
        )[],
        readonly parentJoins : QueryT["parentJoins"],
        readonly unions : QueryT["unions"],
        readonly selects : QueryT["selects"],
        readonly limit : QueryT["limit"],
        readonly unionLimit : QueryT["unionLimit"],
    }>
);
export function rightJoin<
    QueryT extends AfterFromClause,
    AliasedTableT extends IAliasedTable,
    FromDelegateT extends JoinFromDelegate<QueryT["joins"]>
> (
    query : QueryT,
    aliasedTable : AssertUniqueJoinTarget<QueryT, AliasedTableT>,
    fromDelegate : FromDelegateT,
    toDelegate : JoinToDelegate<QueryT, AliasedTableT, FromDelegateT>
) : (
    RightJoin<QueryT, AliasedTableT>
) {
    const {from, to} = invokeJoinDelegate(
        query,
        aliasedTable,
        fromDelegate,
        toDelegate
    );

    const {
        parentJoins,
        unions,
        selects,
        limit,
        unionLimit,
        extraData,
    } = query;

    const newJoins : (
        JoinArrayUtil.ToNullable<QueryT["joins"]>[number] |
        Join<{
            aliasedTable : AliasedTableT,
            columns : AliasedTableT["columns"],
            nullable : false,
        }>
    )[] = [
        ...JoinArrayUtil.toNullable(query.joins as QueryT["joins"]),
        new Join(
            {
                aliasedTable,
                columns : aliasedTable.columns,
                nullable : false,
            },
            JoinType.RIGHT,
            from,
            to,
        ),
    ];

    return new Query(
        {
            joins : newJoins,
            parentJoins,
            unions,
            selects,
            limit,
            unionLimit,
        },
        extraData
    );
}