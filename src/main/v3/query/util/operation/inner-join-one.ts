import {AfterFromClause, AssertValidJoinTarget} from "../predicate";
import {JoinFromDelegate, JoinToDelegate, invokeJoinDelegate} from "./join-delegate";
import {InnerJoin, innerJoin} from "./inner-join";
import {ITable} from "../../../table";
import {CandidateKeyArrayUtil} from "../../../candidate-key-array";
import {IColumn} from "../../../column";

export type AssertValidJoinToOneDelegate<
    QueryT extends AfterFromClause,
    TableT extends ITable,
    FromDelegateT extends JoinFromDelegate<QueryT["_joins"]>,
    //Returns an array of columns
    ToDelegateT extends JoinToDelegate<QueryT, TableT, FromDelegateT>
> = (
    ToDelegateT &
    (
        CandidateKeyArrayUtil.HasKey<
            TableT["candidateKeys"],
            ReturnType<ToDelegateT>[number]["name"][]
        > extends true ?
        unknown :
        [
            ReturnType<ToDelegateT>[number]["name"][],
            "is not a candidate key of",
            TableT["alias"]
        ]
    )
);

/*
    This will force the "to-columns" to be a
    candidate key of the target table.
    No more, no less.
*/
export function innerJoinOne<
    QueryT extends AfterFromClause,
    TableT extends ITable,
    FromDelegateT extends JoinFromDelegate<QueryT["_joins"]>,
    ToDelegateT extends JoinToDelegate<QueryT, TableT, FromDelegateT>
> (
    query : QueryT,
    table : AssertValidJoinTarget<QueryT, TableT>,
    fromDelegate : FromDelegateT,
    toDelegate : AssertValidJoinToOneDelegate<
        QueryT,
        TableT,
        FromDelegateT,
        ToDelegateT
    >
) : (
    InnerJoin<QueryT, TableT>
) {
    const {from, to} = invokeJoinDelegate(
        query,
        table,
        fromDelegate,
        toDelegate
    );

    const toKey = (to as IColumn[]).map(c => c.name);
    if (!CandidateKeyArrayUtil.hasKey(
        table.candidateKeys,
        toKey
    )) {
        throw new Error(`${toKey.join("|")} is not a candidate key of ${table.alias}`);
    }

    return innerJoin<
        QueryT,
        TableT,
        () => ReturnType<FromDelegateT>
    >(
        query,
        table,
        (() => from as ReturnType<FromDelegateT>),
        (() => to as any)
    );
}