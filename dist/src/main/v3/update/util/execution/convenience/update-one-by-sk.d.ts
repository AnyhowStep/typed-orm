import { ITable, TableUtil } from "../../../../table";
import { IConnection, UpdateOneResult } from "../../../../execution";
import { SingleTableSetDelegateFromTable, AssertValidSingleTableSetDelegateFromTable_Hack } from "../../constructor";
export declare function updateOneBySk<TableT extends ITable, DelegateT extends SingleTableSetDelegateFromTable<TableT>>(connection: IConnection, table: TableT & TableUtil.AssertHasCandidateKey<TableT>, sk: TableUtil.SuperKey<TableT>, delegate: DelegateT): (AssertValidSingleTableSetDelegateFromTable_Hack<TableT, DelegateT, Promise<UpdateOneResult>>);
//# sourceMappingURL=update-one-by-sk.d.ts.map