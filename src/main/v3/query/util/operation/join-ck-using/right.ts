import {AfterFromClause, CanWidenColumnTypes, AssertValidJoinTarget} from "../../predicate";
import {ITable} from "../../../../table";
import {JoinUsingDelegate} from "../join-using";
import {AssertValidJoinCkUsingDelegate_Hack, joinCkUsing} from "./join-ck-using";
import {RightJoin, rightJoin} from "../join";
import {JoinType, Join} from "../../../../join";

export function rightJoinCkUsing<
    QueryT extends AfterFromClause & CanWidenColumnTypes,
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
        RightJoin<QueryT, TableT>
    >
) {
    const {
        _joins
    } = joinCkUsing<
        QueryT,
        TableT,
        UsingDelegateT,
        false
    >(
        query,
        table,
        usingDelegate,
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
        () => ReturnType<UsingDelegateT>
    >(
        query,
        table,
        () => lastJoin.from as ReturnType<UsingDelegateT>,
        () => lastJoin.to as any
    );
    return result as any;
}