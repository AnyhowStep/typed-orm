import {AfterFromClause, AssertValidJoinTarget} from "../../predicate";
import {ITable} from "../../../../table";
import {JoinType} from "../../../../join";
import {
    JoinFromDelegate,
    JoinToDelegate,
    LeftJoin,
} from "../join";
import {
    AssertValidJoinCkDelegate_Hack,
    joinCk,
} from "./join-ck";

export function leftJoinCk<
    QueryT extends AfterFromClause,
    TableT extends ITable,
    FromDelegateT extends JoinFromDelegate<QueryT["_joins"]>,
    ToDelegateT extends JoinToDelegate<QueryT, TableT, FromDelegateT>
> (
    query : QueryT,
    table : AssertValidJoinTarget<QueryT, TableT>,
    fromDelegate : FromDelegateT,
    toDelegate : ToDelegateT,
) : (
    AssertValidJoinCkDelegate_Hack<
        QueryT,
        TableT,
        FromDelegateT,
        ToDelegateT,
        LeftJoin<QueryT, TableT>
    >
) {
    return joinCk<
        QueryT,
        TableT,
        FromDelegateT,
        ToDelegateT,
        true
    >(
        query,
        table,
        fromDelegate,
        toDelegate,
        true,
        JoinType.LEFT
    );
}