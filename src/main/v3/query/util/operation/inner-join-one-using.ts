import {AfterFromClause, AssertValidJoinTarget} from "../predicate";
import {JoinUsingDelegate, invokeJoinUsingDelegate} from "./join-using-delegate";
import {InnerJoin} from "./inner-join";
import {CandidateKeyArrayUtil} from "../../../candidate-key-array";
import {ITable} from "../../../table";
import {innerJoinUsing} from "./inner-join-using";

export type AssertValidJoinOneUsingDelegate<
    QueryT extends AfterFromClause,
    TableT extends ITable,
    UsingDelegateT extends JoinUsingDelegate<QueryT["_joins"], TableT>
> = (
    UsingDelegateT &
    (
        CandidateKeyArrayUtil.HasKey<
            TableT["candidateKeys"],
            ReturnType<UsingDelegateT>[number]["name"][]
        > extends true ?
        unknown :
        [
            ReturnType<UsingDelegateT>[number]["name"][],
            "is not a candidate key of",
            TableT["alias"]
        ]
    )
);

export function innerJoinOneUsing<
    QueryT extends AfterFromClause,
    TableT extends ITable,
    UsingDelegateT extends JoinUsingDelegate<QueryT["_joins"], TableT>
> (
    query : QueryT,
    table : AssertValidJoinTarget<QueryT, TableT>,
    usingDelegate : AssertValidJoinOneUsingDelegate<
        QueryT,
        TableT,
        UsingDelegateT
    >
) : (
    InnerJoin<QueryT, TableT>
) {
    const using = invokeJoinUsingDelegate<
        QueryT,
        TableT,
        UsingDelegateT
    >(
        query,
        table,
        usingDelegate
    );

    const usingKey = using.map(c => c.name);
    if (!CandidateKeyArrayUtil.hasKey(
        table.candidateKeys,
        usingKey
    )) {
        throw new Error(`${usingKey.join("|")} is not a candidate key of ${table.alias}`);
    }

    return innerJoinUsing<
        QueryT,
        TableT,
        () => ReturnType<UsingDelegateT>
    >(
        query,
        table,
        () => using
    );
}