import {AfterFromClause, AssertValidJoinTarget, CanWidenColumnTypes} from "../../predicate";
import {IAliasedTable} from "../../../../aliased-table";
import {RightJoin, rightJoin} from "../join";
import {JoinUsingDelegate, joinUsing} from "./join-using";
import {JoinType, Join} from "../../../../join";

export function rightJoinUsing<
    QueryT extends AfterFromClause & CanWidenColumnTypes,
    AliasedTableT extends IAliasedTable,
    UsingDelegateT extends JoinUsingDelegate<QueryT["_joins"], AliasedTableT>
> (
    query : QueryT & CanWidenColumnTypes,
    aliasedTable : AssertValidJoinTarget<QueryT, AliasedTableT>,
    usingDelegate : UsingDelegateT
) : (
    RightJoin<QueryT, AliasedTableT>
) {
    const {
        _joins
    } = joinUsing<
        QueryT,
        AliasedTableT,
        UsingDelegateT,
        false
    >(
        query,
        aliasedTable,
        usingDelegate,
        false,
        JoinType.RIGHT
    );
    //Pretty sure the last join is the one right join we just
    //added
    const lastJoin = _joins[_joins.length-1] as Join<{
        aliasedTable : AliasedTableT,
        columns : AliasedTableT["columns"],
        nullable : false,
    }>;

    return rightJoin<
        QueryT,
        AliasedTableT,
        () => ReturnType<any>
    >(
        query,
        aliasedTable,
        () => lastJoin.from as ReturnType<UsingDelegateT>,
        () => lastJoin.to as any
    );
}