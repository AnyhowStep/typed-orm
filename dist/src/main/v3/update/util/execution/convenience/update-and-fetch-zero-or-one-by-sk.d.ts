import { ITable, TableUtil } from "../../../../table";
import { IConnection } from "../../../../execution";
import { SingleTableSetDelegateFromTable, AssertValidSingleTableSetDelegateFromTable_Hack } from "../../constructor";
import { UpdateAndFetchZeroOrOneResult } from "./update-and-fetch-zero-or-one";
import { SuperKey } from "../../../../super-key";
export declare function updateAndFetchZeroOrOneBySk<TableT extends ITable, DelegateT extends SingleTableSetDelegateFromTable<TableT>>(connection: IConnection, table: TableT & TableUtil.AssertHasCandidateKey<TableT>, sk: SuperKey<TableT>, delegate: DelegateT): (AssertValidSingleTableSetDelegateFromTable_Hack<TableT, DelegateT, Promise<UpdateAndFetchZeroOrOneResult<TableT, DelegateT>>>);
