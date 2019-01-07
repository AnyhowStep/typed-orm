import { ITable, TableUtil } from "../../../table";
import { IConnection } from "../../../execution";
import { FetchOneResult } from "./fetch-one";
import { SuperKey } from "../operation";
export declare function fetchOneBySk<TableT extends ITable>(connection: IConnection, table: TableT & TableUtil.AssertHasCandidateKey<TableT>, sk: SuperKey<TableT>): (Promise<FetchOneResult<TableT>>);
//# sourceMappingURL=fetch-one-by-sk.d.ts.map