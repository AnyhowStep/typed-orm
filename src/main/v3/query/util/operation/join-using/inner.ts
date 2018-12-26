import {AfterFromClause, AssertValidJoinTarget} from "../../predicate";
import {IAliasedTable} from "../../../../aliased-table";
import {JoinUsingDelegate, joinUsing} from "./join-using";
import {InnerJoin} from "../join";
import {JoinType} from "../../../../join";

export function innerJoinUsing<
    QueryT extends AfterFromClause,
    AliasedTableT extends IAliasedTable,
    UsingDelegateT extends JoinUsingDelegate<QueryT["_joins"], AliasedTableT>
> (
    query : QueryT,
    aliasedTable : AssertValidJoinTarget<QueryT, AliasedTableT>,
    usingDelegate : UsingDelegateT
) : (
    InnerJoin<QueryT, AliasedTableT>
) {
    return joinUsing<
        QueryT,
        AliasedTableT,
        UsingDelegateT,
        false
    >(
        query,
        aliasedTable,
        usingDelegate,
        false,
        JoinType.INNER
    );
}