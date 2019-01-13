import { ITable, TableUtil } from "../../../../table";
import { IConnection, UpdateZeroOrOneResult } from "../../../../execution";
import { SingleTableSetDelegateFromTable, AssertValidSingleTableSetDelegateFromTable_Hack } from "../../constructor";
import { CandidateKey } from "../../../../candidate-key";
export declare function updateZeroOrOneByCk<TableT extends ITable, DelegateT extends SingleTableSetDelegateFromTable<TableT>>(connection: IConnection, table: TableT & TableUtil.AssertHasCandidateKey<TableT>, ck: CandidateKey<TableT>, delegate: DelegateT): (AssertValidSingleTableSetDelegateFromTable_Hack<TableT, DelegateT, Promise<UpdateZeroOrOneResult>>);
//# sourceMappingURL=update-zero-or-one-by-ck.d.ts.map