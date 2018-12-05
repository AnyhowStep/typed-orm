import {AfterFromClause, AssertUniqueJoinTarget} from "../predicate";
import {IAliasedTable} from "../../../aliased-table";
import {JoinUsingDelegate, joinUsingColumns, JoinUsingColumnUnion} from "./join-using-delegate";
import {InnerJoin, innerJoin} from "./inner-join";
import { ColumnUtil } from "../../../column";
import { ColumnRefUtil } from "../../../column-ref";

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
    const usingRef : ColumnRefUtil.FromColumnArray<
        JoinUsingColumnUnion<
            ColumnUtil.FromJoinArray<QueryT["joins"]>,
            AliasedTableT
        >[]
    > = ColumnRefUtil.fromColumnArray(
        joinUsingColumns(
            ColumnUtil.Array.fromJoinArray(query.joins as QueryT["joins"]),
            aliasedTable as AliasedTableT
        )
    );
    const using = usingDelegate(ColumnRefUtil.toConvenient(usingRef));
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
    //const usingRef = ColumnRefUtil.from

    /*const joins : QueryT["joins"] = query.joins;
    const usingRef = ColumnRefUtil.fromJoinArray(joins);
    const using = usingDelegate(
        ColumnRefUtil.toConvenient(usingRef)
    );

    return innerJoin<
        QueryT,
        AliasedTableT,
        () => ReturnType<UsingDelegateT>
    >(
        query,
        aliasedTable,
        (() => using) as any,
        () => using.map(c => aliasedTable.columns[c.name]) as any
    ) as any;*/
}