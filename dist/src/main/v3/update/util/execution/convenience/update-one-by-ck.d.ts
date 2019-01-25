import { ITable, TableUtil } from "../../../../table";
import { IConnection, UpdateOneResult } from "../../../../execution";
import { SingleTableSetDelegateFromTable, AssertValidSingleTableSetDelegateFromTable_Hack } from "../../constructor";
import { CandidateKey } from "../../../../candidate-key";
export declare function updateOneByCk<TableT extends ITable, DelegateT extends SingleTableSetDelegateFromTable<TableT>>(connection: IConnection, table: TableT & TableUtil.AssertHasCandidateKey<TableT>, ck: CandidateKey<TableT>, delegate: DelegateT): (AssertValidSingleTableSetDelegateFromTable_Hack<TableT, DelegateT, Promise<UpdateOneResult>>);
