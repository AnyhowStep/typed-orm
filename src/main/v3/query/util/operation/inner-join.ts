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
        readonly joins : (
            QueryT["joins"][number] |
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
export function innerJoin<
    QueryT extends AfterFromClause,
    AliasedTableT extends IAliasedTable,
    FromDelegateT extends JoinFromDelegate<QueryT["joins"]>
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
        parentJoins,
        unions,
        selects,
        limit,
        unionLimit,
        extraData,
    } = query;
    return new Query(
        {
            joins : [
                ...query.joins,
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
            parentJoins,
            unions,
            selects,
            limit,
            unionLimit,
        },
        extraData
    );
}