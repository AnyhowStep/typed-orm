import { ITable } from "../../table";
import { TypeMapUtil } from "../../../type-map";
import { CandidateKey } from "../../../candidate-key";
export declare type PrimaryKey<TableT extends ITable & {
    primaryKey: CandidateKey;
}> = (TypeMapUtil.FromPrimaryKey<TableT["primaryKey"], TableT["columns"]>);
export declare type PrimaryKeyAssertDelegate<TableT extends ITable & {
    primaryKey: CandidateKey;
}> = (TypeMapUtil.AssertDelegateFromPrimaryKey<TableT["primaryKey"], TableT["columns"]>);
export declare function primaryKeyAssertDelegate<TableT extends ITable & {
    primaryKey: CandidateKey;
}>(table: TableT): (PrimaryKeyAssertDelegate<TableT>);
//# sourceMappingURL=primary-key-assert-delegate.d.ts.map