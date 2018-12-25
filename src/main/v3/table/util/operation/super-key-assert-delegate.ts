import {ITable} from "../../table";
import {TypeMapUtil} from "../../../type-map";

export type SuperKey<TableT extends ITable> = (
    TypeMapUtil.SuperKeyUnionFromCandidateKeyArray<
        TableT["candidateKeys"],
        TableT["columns"]
    >
);
export type SuperKeyAssertDelegate<TableT extends ITable> = (
    TypeMapUtil.SuperKeyAssertDelegateFromCandidateKeyArray<
        TableT["candidateKeys"],
        TableT["columns"]
    >
);
export function superKeyAssertDelegate<TableT extends ITable> (
    table : TableT
) : (
    SuperKeyAssertDelegate<TableT>
) {
    //https://github.com/Microsoft/TypeScript/issues/28592
    const candidateKeys : TableT["candidateKeys"] = table.candidateKeys;
    const columns : TableT["columns"] = table.columns;
    return TypeMapUtil.superKeyAssertDelegateFromCandidateKeyArray(
        candidateKeys,
        columns
    );
}