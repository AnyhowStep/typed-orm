import {AfterFromClause, AssertValidJoinTarget} from "../../predicate";
import {ITable} from "../../../../table";
import {JoinType} from "../../../../join";
import {CandidateKeyUtil} from "../../../../candidate-key";
import {JoinResult} from "../join";
import {JoinUsingDelegate, joinUsing} from "../join-using";
import {joinCk} from "../join-ck";

//https://github.com/Microsoft/TypeScript/issues/29133
export type AssertValidJoinCkUsingDelegate_Hack<
    QueryT extends AfterFromClause,
    TableT extends ITable,
    UsingDelegateT extends JoinUsingDelegate<QueryT["_joins"], TableT>,
    ResultT
> = (
    CandidateKeyUtil.Array.HasKey<
        TableT["candidateKeys"],
        ReturnType<UsingDelegateT>[number]["name"][]
    > extends true ?
    ResultT :
    [
        ReturnType<UsingDelegateT>[number]["name"][],
        "is not a candidate key of",
        TableT["alias"]
    ]
);

export function joinCkUsing<
    QueryT extends AfterFromClause,
    TableT extends ITable,
    UsingDelegateT extends JoinUsingDelegate<QueryT["_joins"], TableT>,
    NullableT extends boolean
>(
    query : QueryT,
    table : AssertValidJoinTarget<QueryT, TableT>,
    usingDelegate : UsingDelegateT,
    nullable : NullableT,
    joinType : JoinType
) : (
    AssertValidJoinCkUsingDelegate_Hack<
        QueryT,
        TableT,
        UsingDelegateT,
        JoinResult<
            QueryT,
            TableT,
            NullableT
        >
    >
) {
    const {
        _joins
    } = joinUsing<
        QueryT,
        TableT,
        UsingDelegateT,
        NullableT
    >(
        query,
        table,
        usingDelegate,
        nullable,
        joinType
    );
    const lastJoin = _joins[_joins.length-1];

    return joinCk<
        QueryT,
        TableT,
        () => any,
        () => any,
        NullableT
    >(
        query,
        table,
        () => lastJoin.from,
        () => lastJoin.to,
        nullable,
        joinType
    ) as any;
}