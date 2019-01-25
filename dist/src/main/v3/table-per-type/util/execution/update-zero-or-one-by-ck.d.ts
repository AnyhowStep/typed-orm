import { ITable, TableUtil } from "../../../table";
import { IConnection, UpdateZeroOrOneResult } from "../../../execution";
import { SetDelegate, AssertValidSetDelegate_Hack } from "./update";
import { CandidateKey } from "../../../candidate-key";
export declare function updateZeroOrOneByCk<TableT extends ITable, DelegateT extends SetDelegate<TableT>>(connection: IConnection, table: TableT & TableUtil.AssertHasCandidateKey<TableT>, ck: CandidateKey<TableT>, delegate: DelegateT): (AssertValidSetDelegate_Hack<TableT, DelegateT, Promise<UpdateZeroOrOneResult>>);
