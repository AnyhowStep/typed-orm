import {Query} from "../../query";
import {AfterFromClause, AssertUniqueJoinTarget, assertUniqueJoinTarget} from "../predicate";
import {JoinFromDelegate, JoinToDelegate} from "./join-delegate";
import {IAliasedTable} from "../../../aliased-table";
import {Join, JoinType} from "../../../join";
import {ColumnRefUtil} from "../../../column-ref";
import {ColumnMapUtil} from "../../../column-map";

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
    if (from.length == 0) {
        throw new Error(`Expected JOIN to have at least one column for ON clause`);
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