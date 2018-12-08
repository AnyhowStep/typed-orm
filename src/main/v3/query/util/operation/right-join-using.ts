import {AfterFromClause, AssertUniqueJoinTarget} from "../predicate";
import {IAliasedTable} from "../../../aliased-table";
import {JoinUsingDelegate, invokeJoinUsingDelegate} from "./join-using-delegate";
import {RightJoin, rightJoin} from "./right-join";

export function rightJoinUsing<
    QueryT extends AfterFromClause,
    AliasedTableT extends IAliasedTable,
    UsingDelegateT extends JoinUsingDelegate<QueryT["_joins"], AliasedTableT>
> (
    query : QueryT,
    aliasedTable : AssertUniqueJoinTarget<QueryT, AliasedTableT>,
    usingDelegate : UsingDelegateT
) : (
    RightJoin<QueryT, AliasedTableT>
) {
    const using = invokeJoinUsingDelegate<
        QueryT,
        AliasedTableT,
        UsingDelegateT
    >(
        query,
        aliasedTable,
        usingDelegate
    );
    return rightJoin<
        QueryT,
        AliasedTableT,
        () => ReturnType<UsingDelegateT>
    >(
        query,
        aliasedTable,
        (() => using as ReturnType<UsingDelegateT>),
        () => using.map(c => aliasedTable.columns[c.name]) as any
    );
}