import {AfterFromClause, AssertUniqueJoinTarget} from "../predicate";
import {IAliasedTable} from "../../../aliased-table";
import {JoinUsingDelegate, invokeJoinUsingDelegate} from "./join-using-delegate";
import {InnerJoin, innerJoin} from "./inner-join";

export function innerJoinUsing<
    QueryT extends AfterFromClause,
    AliasedTableT extends IAliasedTable,
    UsingDelegateT extends JoinUsingDelegate<QueryT["joins"], AliasedTableT>
> (
    query : QueryT,
    aliasedTable : AssertUniqueJoinTarget<QueryT, AliasedTableT>,
    usingDelegate : UsingDelegateT
) : (
    InnerJoin<QueryT, AliasedTableT>
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
    return innerJoin<
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