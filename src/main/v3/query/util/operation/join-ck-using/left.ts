import {AfterFromClause, AssertValidJoinTarget} from "../../predicate";
import {ITable} from "../../../../table";
import {JoinUsingDelegate} from "../join-using";
import {AssertValidJoinCkUsingDelegate_Hack, joinCkUsing} from "./join-ck-using";
import {LeftJoin} from "../join";
import {JoinType} from "../../../../join";

export function leftJoinCkUsing<
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
        LeftJoin<QueryT, TableT>
    >
) {
    return joinCkUsing<
        QueryT,
        TableT,
        UsingDelegateT,
        true
    >(
        query,
        table,
        usingDelegate,
        true,
        JoinType.LEFT
    );
}