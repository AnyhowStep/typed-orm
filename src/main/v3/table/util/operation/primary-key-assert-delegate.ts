import {ITable} from "../../table";
import {TypeMapUtil} from "../../../type-map";
import {CandidateKey} from "../../../candidate-key";

export type PrimaryKey<TableT extends ITable & { primaryKey : CandidateKey }> = (
    TypeMapUtil.FromPrimaryKey<
        TableT["primaryKey"],
        TableT["columns"]
    >
);
export type PrimaryKeyAssertDelegate<TableT extends ITable & { primaryKey : CandidateKey }> = (
    TypeMapUtil.AssertDelegateFromPrimaryKey<
        TableT["primaryKey"],
        TableT["columns"]
    >
);
export function primaryKeyAssertDelegate<TableT extends ITable & { primaryKey : CandidateKey }> (
    table : TableT
) : (
    PrimaryKeyAssertDelegate<TableT>
) {
    //https://github.com/Microsoft/TypeScript/issues/28592
    const primaryKey : TableT["primaryKey"] = table.primaryKey;
    const columns : TableT["columns"] = table.columns;
    return TypeMapUtil.assertDelegateFromPrimaryKey(
        primaryKey,
        columns
    );
}