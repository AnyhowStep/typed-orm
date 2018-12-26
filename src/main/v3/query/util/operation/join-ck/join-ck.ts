import {AfterFromClause, AssertValidJoinTarget} from "../../predicate";
import {JoinFromDelegate, JoinToDelegate, JoinResult, join} from "../join";
import {ITable} from "../../../../table";
import {CandidateKeyArrayUtil} from "../../../../candidate-key-array";
import {JoinType} from "../../../../join";

//https://github.com/Microsoft/TypeScript/issues/29133
export type AssertValidJoinCkDelegate_Hack<
    QueryT extends AfterFromClause,
    TableT extends ITable,
    FromDelegateT extends JoinFromDelegate<QueryT["_joins"]>,
    ToDelegateT extends JoinToDelegate<QueryT, TableT, FromDelegateT>,
    ResultT
> = (
    CandidateKeyArrayUtil.HasKey<
        TableT["candidateKeys"],
        ReturnType<ToDelegateT>[number]["name"][]
    > extends true ?
    ResultT :
    [
        ReturnType<ToDelegateT>[number]["name"][],
        "is not a candidate key of",
        TableT["alias"]
    ]
);

export function joinCk<
    QueryT extends AfterFromClause,
    TableT extends ITable,
    FromDelegateT extends JoinFromDelegate<QueryT["_joins"]>,
    ToDelegateT extends JoinToDelegate<QueryT, TableT, FromDelegateT>,
    NullableT extends boolean
> (
    query : QueryT,
    table : AssertValidJoinTarget<QueryT, TableT>,
    fromDelegate : FromDelegateT,
    toDelegate : ToDelegateT,
    nullable : NullableT,
    joinType : JoinType
) : (
    AssertValidJoinCkDelegate_Hack<
        QueryT,
        TableT,
        FromDelegateT,
        ToDelegateT,
        JoinResult<
            QueryT,
            TableT,
            NullableT
        >
    >
) {
    const result = join(
        query,
        table,
        fromDelegate,
        toDelegate,
        nullable,
        joinType
    );
    const lastJoin = result._joins[result._joins.length-1];

    const toKey = lastJoin.to.map(c => c.name);
    if (!CandidateKeyArrayUtil.hasKey(
        table.candidateKeys,
        toKey
    )) {
        throw new Error(`${toKey.join("|")} is not a candidate key of ${table.alias}`);
    }
    return result as any;
}