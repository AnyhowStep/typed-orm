import {IAliasedTable} from "../../../aliased-table";
import {InnerJoin, innerJoin} from "./inner-join";
import {JoinUsingDelegate} from "./join-using-delegate";
import {AssertValidJoinTarget} from "../predicate";

export function innerJoinUsing<
    FromTableT extends IAliasedTable,
    ToTableT extends IAliasedTable,
    UsingDelegateT extends JoinUsingDelegate<FromTableT, ToTableT>
> (
    fromTable : FromTableT,
    toTable : AssertValidJoinTarget<FromTableT, ToTableT>,
    usingDelegate : UsingDelegateT
) : InnerJoin<FromTableT, ToTableT> {
    const usingColumns = (
        usingDelegate(fromTable.columns)
    ) as ReturnType<UsingDelegateT>;

    return innerJoin<
        FromTableT,
        ToTableT,
        () => ReturnType<UsingDelegateT>
    >(
        fromTable,
        toTable,
        () => usingColumns,
        () => (
            usingColumns.map(c => toTable.columns[c.name])
        ) as any
    );
}