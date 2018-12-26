import {IAliasedTable} from "../../../../aliased-table";
import {InnerJoin} from "../join";
import {JoinUsingDelegate, joinUsing} from "./join-using";
import {AssertValidJoinTarget} from "../../predicate";
import {JoinType} from "../../../../join";

export function innerJoinUsing<
    FromTableT extends IAliasedTable,
    ToTableT extends IAliasedTable,
    UsingDelegateT extends JoinUsingDelegate<FromTableT, ToTableT>
> (
    fromTable : FromTableT,
    toTable : AssertValidJoinTarget<FromTableT, ToTableT>,
    usingDelegate : UsingDelegateT
) : InnerJoin<FromTableT, ToTableT> {
    return joinUsing<
        FromTableT,
        ToTableT,
        UsingDelegateT,
        false
    >(
        fromTable,
        toTable,
        usingDelegate,
        false,
        JoinType.INNER
    );
}