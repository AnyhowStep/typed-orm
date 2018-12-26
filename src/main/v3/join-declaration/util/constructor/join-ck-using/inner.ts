import {IAliasedTable} from "../../../../aliased-table";
import {ITable} from "../../../../table";
import {InnerJoin} from "../join";
import {JoinCkUsingDelegate, AssertValidJoinCkUsingDelegate_Hack, joinCkUsing} from "./join-ck-using";
import {AssertValidJoinTarget} from "../../predicate";
import {JoinType} from "../../../../join";

export function innerJoinCkUsing<
    FromTableT extends IAliasedTable,
    ToTableT extends ITable,
    UsingDelegateT extends JoinCkUsingDelegate<FromTableT, ToTableT>
> (
    fromTable : FromTableT,
    toTable : AssertValidJoinTarget<FromTableT, ToTableT>,
    usingDelegate : UsingDelegateT
) : (
    AssertValidJoinCkUsingDelegate_Hack<
        FromTableT,
        ToTableT,
        UsingDelegateT,
        InnerJoin<FromTableT, ToTableT>
    >
) {
    return joinCkUsing<
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