import {IAliasedTable} from "../../../../aliased-table";
import {ITable} from "../../../../table";
import {JoinFromDelegate, JoinToDelegate} from "../join";
import {AssertValidJoinTarget} from "../../predicate";
import {CandidateKeyArrayUtil} from "../../../../candidate-key-array";
import {JoinType} from "../../../../join";
import {JoinDeclaration} from "../../../join-declaration";
import {join} from "../join";

//https://github.com/Microsoft/TypeScript/issues/29133
export type AssertValidJoinCkDelegate_Hack<
    FromTableT extends IAliasedTable,
    ToTableT extends ITable,
    FromDelegateT extends JoinFromDelegate<FromTableT>,
    ToDelegateT extends JoinToDelegate<FromTableT, ToTableT, FromDelegateT>,
    ResultT
> = (
    CandidateKeyArrayUtil.HasKey<
        ToTableT["candidateKeys"],
        ReturnType<ToDelegateT>[number]["name"][]
    > extends true ?
    ResultT :
    [
        ReturnType<ToDelegateT>[number]["name"][],
        "is not a candidate key of",
        ToTableT["alias"]
    ]|void
);

export function joinCk<
    FromTableT extends IAliasedTable,
    ToTableT extends ITable,
    FromDelegateT extends JoinFromDelegate<FromTableT>,
    ToDelegateT extends JoinToDelegate<FromTableT, ToTableT, FromDelegateT>,
    NullableT extends boolean
> (
    fromTable : FromTableT,
    toTable : AssertValidJoinTarget<FromTableT, ToTableT>,
    fromDelegate : FromDelegateT,
    toDelegate : ToDelegateT,
    nullable : NullableT,
    joinType : JoinType.INNER|JoinType.LEFT
) : (
    AssertValidJoinCkDelegate_Hack<
        FromTableT,
        ToTableT,
        FromDelegateT,
        ToDelegateT,
        JoinDeclaration<{
            readonly fromTable : FromTableT;
            readonly toTable : ToTableT,
            readonly nullable : NullableT,
        }>
    >
) {
    const result = join<
        FromTableT,
        ToTableT,
        FromDelegateT,
        NullableT
    >(
        fromTable,
        toTable,
        fromDelegate,
        toDelegate,
        nullable,
        joinType
    );

    const toKey = result.to.map(c => c.name);
    if (!CandidateKeyArrayUtil.hasKey(
        result.toTable.candidateKeys,
        toKey
    )) {
        throw new Error(`${toKey.join("|")} is not a candidate key of ${result.toTable.alias}`);
    }
    return result as any;
}
