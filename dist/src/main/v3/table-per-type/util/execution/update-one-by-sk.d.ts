import { ITable, TableUtil } from "../../../table";
import { IConnection, UpdateOneResult } from "../../../execution";
import { SetDelegate, AssertValidSetDelegate_Hack } from "./update";
import { SuperKey } from "../../../super-key";
export declare function updateOneBySk<TableT extends ITable, DelegateT extends SetDelegate<TableT>>(connection: IConnection, table: TableT & TableUtil.AssertHasCandidateKey<TableT>, sk: SuperKey<TableT>, delegate: DelegateT): (AssertValidSetDelegate_Hack<TableT, DelegateT, Promise<UpdateOneResult>>);
