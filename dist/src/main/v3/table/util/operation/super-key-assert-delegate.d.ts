import { ITable } from "../../table";
import { TypeMapUtil } from "../../../type-map";
export declare type SuperKey<TableT extends ITable> = (TypeMapUtil.SuperKeyUnionFromCandidateKeyArray<TableT["candidateKeys"], TableT["columns"]>);
export declare type SuperKeyAssertDelegate<TableT extends ITable> = (TypeMapUtil.SuperKeyAssertDelegateFromCandidateKeyArray<TableT["candidateKeys"], TableT["columns"]>);
export declare function superKeyAssertDelegate<TableT extends ITable>(table: TableT): (SuperKeyAssertDelegate<TableT>);
//# sourceMappingURL=super-key-assert-delegate.d.ts.map