import { ITable, TableUtil } from "../../../table";
import { IConnection } from "../../../execution";
import { FetchZeroOrOneResult } from "./fetch-zero-or-one";
import { SuperKey } from "../operation";
export declare function fetchZeroOrOneBySk<TableT extends ITable>(connection: IConnection, table: TableT & TableUtil.AssertHasCandidateKey<TableT>, sk: SuperKey<TableT>): (Promise<FetchZeroOrOneResult<TableT>>);
//# sourceMappingURL=fetch-zero-or-one-by-sk.d.ts.map