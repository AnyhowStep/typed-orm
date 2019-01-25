import { ITable, TableUtil } from "../../../../table";
import { IConnection } from "../../../../execution";
import { SingleTableSetDelegateFromTable, AssertValidSingleTableSetDelegateFromTable_Hack } from "../../constructor";
import { UpdateAndFetchOneResult } from "./update-and-fetch-one";
import { CandidateKey } from "../../../../candidate-key";
export declare function updateAndFetchOneByCk<TableT extends ITable, DelegateT extends SingleTableSetDelegateFromTable<TableT>>(connection: IConnection, table: TableT & TableUtil.AssertHasCandidateKey<TableT>, ck: CandidateKey<TableT>, delegate: DelegateT): (AssertValidSingleTableSetDelegateFromTable_Hack<TableT, DelegateT, Promise<UpdateAndFetchOneResult<TableT, DelegateT>>>);
