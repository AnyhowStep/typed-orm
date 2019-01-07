import { ITable, TableUtil } from "../../../table";
import { IConnection, UpdateZeroOrOneResult } from "../../../execution";
import { SetDelegate, AssertValidSetDelegate_Hack } from "./update";
import { SuperKey } from "../operation";
export declare function updateZeroOrOneBySk<TableT extends ITable, DelegateT extends SetDelegate<TableT>>(connection: IConnection, table: TableT & TableUtil.AssertHasCandidateKey<TableT>, sk: SuperKey<TableT>, delegate: DelegateT): (AssertValidSetDelegate_Hack<TableT, DelegateT, Promise<UpdateZeroOrOneResult>>);
//# sourceMappingURL=update-zero-or-one-by-sk.d.ts.map