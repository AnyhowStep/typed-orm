import {IAliasedTable} from "../../../../aliased-table";
import {ITable} from "../../../../table";
import {JoinType} from "../../../../join";
import {InnerJoin, JoinFromDelegate, JoinToDelegate} from "../join";
import {AssertValidJoinCkDelegate_Hack, joinCk} from "./join-ck";
import {AssertValidJoinTarget} from "../../predicate";

export function innerJoinCk<
    FromTableT extends IAliasedTable,
    ToTableT extends ITable,
    FromDelegateT extends JoinFromDelegate<FromTableT>,
    ToDelegateT extends JoinToDelegate<FromTableT, ToTableT, FromDelegateT>
> (
    fromTable : FromTableT,
    toTable : AssertValidJoinTarget<FromTableT, ToTableT>,
    fromDelegate : FromDelegateT,
    toDelegate : ToDelegateT
) : (
    AssertValidJoinCkDelegate_Hack<
        FromTableT,
        ToTableT,
        FromDelegateT,
        ToDelegateT,
        InnerJoin<FromTableT, ToTableT>
    >
) {
    return joinCk<
        FromTableT,
        ToTableT,
        FromDelegateT,
        ToDelegateT,
        false
    >(
        fromTable,
        toTable,
        fromDelegate,
        toDelegate,
        false,
        JoinType.INNER
    );
}