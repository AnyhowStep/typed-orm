import {AfterFromClause, AssertValidJoinTarget} from "../../predicate";
import {IAliasedTable} from "../../../../aliased-table";
import {JoinUsingDelegate, joinUsing} from "./join-using";
import {LeftJoin} from "../join";
import {JoinType} from "../../../../join";

export function leftJoinUsing<
    QueryT extends AfterFromClause,
    AliasedTableT extends IAliasedTable,
    UsingDelegateT extends JoinUsingDelegate<QueryT["_joins"], AliasedTableT>
> (
    query : QueryT,
    aliasedTable : AssertValidJoinTarget<QueryT, AliasedTableT>,
    usingDelegate : UsingDelegateT
) : (
    LeftJoin<QueryT, AliasedTableT>
) {
    return joinUsing<
        QueryT,
        AliasedTableT,
        UsingDelegateT,
        true
    >(
        query,
        aliasedTable,
        usingDelegate,
        true,
        JoinType.LEFT
    );
}