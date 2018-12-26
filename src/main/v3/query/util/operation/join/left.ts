import {AfterFromClause, AssertValidJoinTarget} from "../../predicate";
import {IAliasedTable} from "../../../../aliased-table";
import {JoinType} from "../../../../join";
import {
    JoinFromDelegate,
    JoinToDelegate,
    join,
    JoinResult
} from "./join";

export type LeftJoin<
    QueryT extends AfterFromClause,
    AliasedTableT extends IAliasedTable
> = (
    JoinResult<
        QueryT,
        AliasedTableT,
        true
    >
);
export function leftJoin<
    QueryT extends AfterFromClause,
    AliasedTableT extends IAliasedTable,
    FromDelegateT extends JoinFromDelegate<QueryT["_joins"]>
> (
    query : QueryT,
    aliasedTable : AssertValidJoinTarget<QueryT, AliasedTableT>,
    fromDelegate : FromDelegateT,
    toDelegate : JoinToDelegate<QueryT, AliasedTableT, FromDelegateT>
) : (
    LeftJoin<QueryT, AliasedTableT>
) {
    return join(
        query,
        aliasedTable,
        fromDelegate,
        toDelegate,
        true,
        JoinType.LEFT
    );
}