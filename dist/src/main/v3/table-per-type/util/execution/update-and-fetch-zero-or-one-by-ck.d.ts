import { ITable, TableUtil } from "../../../table";
import { IConnection } from "../../../execution";
import { SetDelegate, AssertValidSetDelegate_Hack } from "./update";
import { UpdateAndFetchZeroOrOneResult } from "./update-and-fetch-zero-or-one";
import { CandidateKey } from "../../../candidate-key";
export declare function updateAndFetchZeroOrOneByCk<TableT extends ITable, DelegateT extends SetDelegate<TableT>>(connection: IConnection, table: TableT & TableUtil.AssertHasCandidateKey<TableT>, ck: CandidateKey<TableT>, delegate: DelegateT): (AssertValidSetDelegate_Hack<TableT, DelegateT, Promise<UpdateAndFetchZeroOrOneResult<TableT, DelegateT>>>);
