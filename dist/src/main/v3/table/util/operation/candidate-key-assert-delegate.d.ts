import { ITable } from "../../table";
import { TypeMapUtil } from "../../../type-map";
export declare type CandidateKey<TableT extends ITable> = (TypeMapUtil.UnionFromCandidateKeyArray<TableT["candidateKeys"], TableT["columns"]>);
export declare type CandidateKeyAssertDelegate<TableT extends ITable> = (TypeMapUtil.AssertDelegateFromCandidateKeyArray<TableT["candidateKeys"], TableT["columns"]>);
export declare function candidateKeyAssertDelegate<TableT extends ITable>(table: TableT): (CandidateKeyAssertDelegate<TableT>);
//# sourceMappingURL=candidate-key-assert-delegate.d.ts.map