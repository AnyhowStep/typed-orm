import {ITable} from "../../table";
import {TypeMapUtil} from "../../../type-map";

export type CandidateKey<TableT extends ITable> = (
    TypeMapUtil.UnionFromCandidateKeyArray<
        TableT["candidateKeys"],
        TableT["columns"]
    >
);
export type CandidateKeyAssertDelegate<TableT extends ITable> = (
    TypeMapUtil.AssertDelegateFromCandidateKeyArray<
        TableT["candidateKeys"],
        TableT["columns"]
    >
);
export function candidateKeyAssertDelegate<TableT extends ITable> (
    table : TableT
) : (
    CandidateKeyAssertDelegate<TableT>
) {
    //https://github.com/Microsoft/TypeScript/issues/28592
    const candidateKeys : TableT["candidateKeys"] = table.candidateKeys;
    const columns : TableT["columns"] = table.columns;
    return TypeMapUtil.assertDelegateFromCandidateKeyArray(
        candidateKeys,
        columns
    );
}