import {AfterFromClause, AssertUniqueJoinTarget} from "../predicate";
import {IAliasedTable} from "../../../aliased-table";
import {JoinUsingDelegate, invokeJoinUsingDelegate} from "./join-using-delegate";
import {LeftJoin, leftJoin} from "./left-join";

export function leftJoinUsing<
    QueryT extends AfterFromClause,
    AliasedTableT extends IAliasedTable,
    UsingDelegateT extends JoinUsingDelegate<QueryT["joins"], AliasedTableT>
> (
    query : QueryT,
    aliasedTable : AssertUniqueJoinTarget<QueryT, AliasedTableT>,
    usingDelegate : UsingDelegateT
) : (
    LeftJoin<QueryT, AliasedTableT>
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
    return leftJoin<
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