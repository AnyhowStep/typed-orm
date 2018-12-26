import {IAliasedTable} from "../../../../aliased-table";
import {LeftJoin} from "../join";
import {JoinUsingDelegate, joinUsing} from "./join-using";
import {AssertValidJoinTarget} from "../../predicate";
import {JoinType} from "../../../../join";

export function leftJoinUsing<
    FromTableT extends IAliasedTable,
    ToTableT extends IAliasedTable,
    UsingDelegateT extends JoinUsingDelegate<FromTableT, ToTableT>
> (
    fromTable : FromTableT,
    toTable : AssertValidJoinTarget<FromTableT, ToTableT>,
    usingDelegate : UsingDelegateT
) : LeftJoin<FromTableT, ToTableT> {
    return joinUsing<
        FromTableT,
        ToTableT,
        UsingDelegateT,
        true
    >(
        fromTable,
        toTable,
        usingDelegate,
        true,
        JoinType.LEFT
    );
}