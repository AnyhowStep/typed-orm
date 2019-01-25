import { ITable, TableUtil } from "../../../table";
import { IConnection } from "../../../execution";
import { SetDelegate, AssertValidSetDelegate_Hack } from "./update";
import { UpdateAndFetchOneResult } from "./update-and-fetch-one";
import { SuperKey } from "../operation";
export declare function updateAndFetchOneBySk<TableT extends ITable, DelegateT extends SetDelegate<TableT>>(connection: IConnection, table: TableT & TableUtil.AssertHasCandidateKey<TableT>, sk: SuperKey<TableT>, delegate: DelegateT): (AssertValidSetDelegate_Hack<TableT, DelegateT, Promise<UpdateAndFetchOneResult<TableT, DelegateT>>>);
