import {Query} from "../../query";
import {AfterFromClause, AssertUniqueJoinTarget, assertUniqueJoinTarget} from "../predicate";
import {JoinFromDelegate, JoinToDelegate} from "./join-delegate";
import {IAliasedTable} from "../../../aliased-table";
import {Join, JoinType} from "../../../join";
import {ColumnRefUtil} from "../../../column-ref";
import {ColumnMapUtil} from "../../../column-map";

export type LeftJoin<
    QueryT extends AfterFromClause,
    AliasedTableT extends IAliasedTable
> = (
    Query<{
        readonly joins : (
            QueryT["joins"][number] |
            Join<{
                aliasedTable : AliasedTableT,
                columns : AliasedTableT["columns"],
                nullable : true,
            }>
        )[],
        readonly parentJoins : QueryT["parentJoins"],
        readonly unions : QueryT["unions"],
        readonly selects : QueryT["selects"],
        readonly limit : QueryT["limit"],
        readonly unionLimit : QueryT["unionLimit"],
    }>
);
export function leftJoin<
    QueryT extends AfterFromClause,
    AliasedTableT extends IAliasedTable,
    FromDelegateT extends JoinFromDelegate<QueryT["joins"]>
> (
    query : QueryT,
    aliasedTable : AssertUniqueJoinTarget<QueryT, AliasedTableT>,
    fromDelegate : FromDelegateT,
    toDelegate : JoinToDelegate<QueryT, AliasedTableT, FromDelegateT>
) : (
    LeftJoin<QueryT, AliasedTableT>
) {
    if (query.joins == undefined) {
        throw new Error(`Cannot JOIN before FROM clause`);
    }
    assertUniqueJoinTarget(query, aliasedTable);

    const joins : QueryT["joins"] = query.joins;
    const fromRef = ColumnRefUtil.fromJoinArray(joins);
    const from = fromDelegate(
        ColumnRefUtil.toConvenient(fromRef)
    );
    const to = toDelegate(aliasedTable.columns);
    if (from.length != to.length) {
        throw new Error(`Expected JOIN to have ${from.length} target columns`);
    }
    ColumnRefUtil.assertHasColumnIdentifiers(
        fromRef,
        from
    );
    ColumnMapUtil.assertHasColumnIdentifiers(
        aliasedTable.columns,
        to
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
                        nullable : true,
                    },
                    JoinType.LEFT,
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