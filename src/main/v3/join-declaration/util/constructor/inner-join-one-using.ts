import {IAliasedTable} from "../../../aliased-table";
import {ITable} from "../../../table";
import {InnerJoin} from "./inner-join";
import {innerJoinUsing} from "./inner-join-using";
import {JoinOneUsingDelegate, AssertValidJoinOneUsingDelegate_Hack} from "./join-one-using-delegate";
import {AssertValidJoinTarget} from "../predicate";
import {IColumn} from "../../../column";
import {CandidateKeyArrayUtil} from "../../../candidate-key-array";

export function innerJoinOneUsing<
    FromTableT extends IAliasedTable,
    ToTableT extends ITable,
    UsingDelegateT extends JoinOneUsingDelegate<FromTableT, ToTableT>
> (
    fromTable : FromTableT,
    toTable : AssertValidJoinTarget<FromTableT, ToTableT>,
    usingDelegate : UsingDelegateT
) : (
    AssertValidJoinOneUsingDelegate_Hack<
        FromTableT,
        ToTableT,
        UsingDelegateT,
        InnerJoin<FromTableT, ToTableT>
    >
) {
    const result = innerJoinUsing(
        fromTable,
        toTable as any,
        usingDelegate as any
    );

    const toKey = (result.to as IColumn[]).map(c => c.name);
    if (!CandidateKeyArrayUtil.hasKey(
        result.toTable.candidateKeys,
        toKey
    )) {
        throw new Error(`${toKey.join("|")} is not a candidate key of ${result.toTable.alias}`);
    }
    return result as any;
}