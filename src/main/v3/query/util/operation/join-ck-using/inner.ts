import {AfterFromClause, AssertValidJoinTarget} from "../../predicate";
import {ITable} from "../../../../table";
import {JoinUsingDelegate} from "../join-using";
import {AssertValidJoinCkUsingDelegate_Hack, joinCkUsing} from "./join-ck-using";
import {InnerJoin} from "../join";
import {JoinType} from "../../../../join";

export function innerJoinCkUsing<
    QueryT extends AfterFromClause,
    TableT extends ITable,
    UsingDelegateT extends JoinUsingDelegate<QueryT["_joins"], TableT>
> (
    query : QueryT,
    table : AssertValidJoinTarget<QueryT, TableT>,
    usingDelegate : UsingDelegateT,
) : (
    AssertValidJoinCkUsingDelegate_Hack<
        QueryT,
        TableT,
        UsingDelegateT,
        InnerJoin<QueryT, TableT>
    >
) {
    return joinCkUsing<
        QueryT,
        TableT,
        UsingDelegateT,
        false
    >(
        query,
        table,
        usingDelegate,
        false,
        JoinType.INNER
    );
}