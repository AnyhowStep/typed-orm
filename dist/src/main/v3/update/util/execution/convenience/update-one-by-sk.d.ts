import { ITable, TableUtil } from "../../../../table";
import { IConnection, UpdateOneResult } from "../../../../execution";
import { SingleTableSetDelegateFromTable, AssertValidSingleTableSetDelegateFromTable_Hack } from "../../constructor";
import { SuperKey } from "../../../../super-key";
export declare function updateOneBySk<TableT extends ITable, DelegateT extends SingleTableSetDelegateFromTable<TableT>>(connection: IConnection, table: TableT & TableUtil.AssertHasCandidateKey<TableT>, sk: SuperKey<TableT>, delegate: DelegateT): (AssertValidSingleTableSetDelegateFromTable_Hack<TableT, DelegateT, Promise<UpdateOneResult>>);
