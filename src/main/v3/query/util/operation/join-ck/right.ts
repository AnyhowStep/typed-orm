import {AfterFromClause, CanWidenColumnTypes, AssertValidJoinTarget} from "../../predicate";
import {ITable} from "../../../../table";
import {JoinType, Join} from "../../../../join";
import {
    JoinFromDelegate,
    JoinToDelegate,
    RightJoin,
    rightJoin,
} from "../join";
import {
    AssertValidJoinCkDelegate_Hack,
    joinCk,
} from "./join-ck";

export function rightJoinCk<
    QueryT extends AfterFromClause & CanWidenColumnTypes,
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
        RightJoin<QueryT, TableT>
    >
) {
    const {
        _joins
    } = joinCk<
        QueryT,
        TableT,
        FromDelegateT,
        ToDelegateT,
        false
    >(
        query,
        table,
        fromDelegate,
        toDelegate,
        false,
        JoinType.RIGHT
    ) as any;
    //Pretty sure the last join is the one right join we just
    //added
    const lastJoin = _joins[_joins.length-1] as Join<{
        aliasedTable : TableT,
        columns : TableT["columns"],
        nullable : false,
    }>;

    const result : RightJoin<QueryT, TableT> = rightJoin<
        QueryT,
        TableT,
        () => ReturnType<FromDelegateT>
    >(
        query,
        table,
        () => lastJoin.from as ReturnType<FromDelegateT>,
        () => lastJoin.to as any
    );
    return result as any;
}