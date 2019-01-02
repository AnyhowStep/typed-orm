import { ITable, TableUtil } from "../../../table";
import { IConnection } from "../../../execution";
import { SetDelegate, AssertValidSetDelegate_Hack } from "./update";
import { UpdateAndFetchZeroOrOneResult } from "./update-and-fetch-zero-or-one";
import { SuperKey } from "../operation";
export declare function updateAndFetchZeroOrOneBySk<TableT extends ITable, DelegateT extends SetDelegate<TableT>>(connection: IConnection, table: TableT & TableUtil.AssertHasCandidateKey<TableT>, sk: SuperKey<TableT>, delegate: DelegateT): (AssertValidSetDelegate_Hack<TableT, DelegateT, Promise<UpdateAndFetchZeroOrOneResult<TableT, DelegateT>>>);
//# sourceMappingURL=update-and-fetch-zero-or-one-by-sk.d.ts.map