import {Query} from "../../query";
import {Join, JoinType} from "../../../join";
import {BeforeFromClause, AssertUniqueJoinTarget, assertUniqueJoinTarget} from "../predicate";
import {IAliasedTable} from "../../../aliased-table";

export type From<
    QueryT extends BeforeFromClause,
    AliasedTableT extends IAliasedTable
> = (
    Query<{
        readonly joins : Join<{
            aliasedTable : AliasedTableT,
            columns : AliasedTableT["columns"],
            nullable : false,
        }>[],
        readonly parentJoins : QueryT["parentJoins"],
        readonly unions : QueryT["unions"],
        readonly selects : QueryT["selects"],
        readonly limit : QueryT["limit"],
        readonly unionLimit : QueryT["unionLimit"],
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
    if (query.joins != undefined) {
        throw new Error(`FROM clause not allowed more than once`);
    }
    assertUniqueJoinTarget(query, aliasedTable);

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
            parentJoins,
            unions,
            selects,
            limit,
            unionLimit,
        },
        extraData
    );
}