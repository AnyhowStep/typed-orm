import {IAliasedTable} from "../../../aliased-table";
import {ITable} from "../../../table";
import {ColumnUtil} from "../../../column";
import {QueryUtil} from "../../../query";
import {NonEmptyTuple} from "../../../tuple";
import {ColumnMapUtil} from "../../../column-map";
import {CandidateKeyArrayUtil} from "../../../candidate-key-array";
import {AssertValidJoinTarget} from "../predicate";
import {JoinDeclaration} from "../../join-declaration";
import {JoinType} from "../../../join";
import { invokeJoinUsingDelegate } from "./join-using-delegate";

export type JoinOneUsingDelegate<
    FromTableT extends IAliasedTable,
    ToTableT extends ITable
> = (
    (
        columns : ColumnMapUtil.FromColumnArray<
            Extract<
                QueryUtil.JoinUsingColumnUnion<
                    ColumnUtil.FromColumnMap<FromTableT["columns"]>,
                    ToTableT
                >,
                {
                    name : ToTableT["candidateKeys"][number][number]
                }
            >[]
        >
    ) => (
        NonEmptyTuple<(
            Extract<
                QueryUtil.JoinUsingColumnUnion<
                    ColumnUtil.FromColumnMap<FromTableT["columns"]>,
                    ToTableT
                >,
                {
                    name : ToTableT["candidateKeys"][number][number]
                }
            >
        )>
    )
);

//https://github.com/Microsoft/TypeScript/issues/29133
export type AssertValidJoinOneUsingDelegate_Hack<
    FromTableT extends IAliasedTable,
    ToTableT extends ITable,
    DelegateT extends JoinOneUsingDelegate<FromTableT, ToTableT>,
    ResultT
> = (
    CandidateKeyArrayUtil.HasKey<
        ToTableT["candidateKeys"],
        ReturnType<DelegateT>[number]["name"][]
    > extends true ?
    ResultT :
    [
        ReturnType<DelegateT>[number]["name"][],
        "is not a candidate key of",
        ToTableT["alias"]
    ]|void
);

export function invokeJoinOneUsing<
    FromTableT extends IAliasedTable,
    ToTableT extends ITable,
    UsingDelegateT extends JoinOneUsingDelegate<FromTableT, ToTableT>,
    NullableT extends boolean,
> (
    fromTable : FromTableT,
    toTable : AssertValidJoinTarget<FromTableT, ToTableT>,
    usingDelegate : UsingDelegateT,
    nullable : NullableT,
    joinType : JoinType.INNER|JoinType.LEFT
) : (
    AssertValidJoinOneUsingDelegate_Hack<
        FromTableT,
        ToTableT,
        UsingDelegateT,
        JoinDeclaration<{
            readonly fromTable : FromTableT;
            readonly toTable : ToTableT,
            readonly nullable : NullableT,
        }>
    >
) {
    const result = invokeJoinUsingDelegate(
        fromTable,
        toTable as any,
        usingDelegate as any,
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