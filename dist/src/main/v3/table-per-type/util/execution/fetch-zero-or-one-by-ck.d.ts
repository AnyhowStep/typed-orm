import { ITable, TableUtil } from "../../../table";
import { IConnection } from "../../../execution";
import { FetchZeroOrOneResult } from "./fetch-zero-or-one";
export declare function fetchZeroOrOneByCk<TableT extends ITable>(connection: IConnection, table: TableT & TableUtil.AssertHasCandidateKey<TableT>, ck: TableUtil.CandidateKey<TableT>): (Promise<FetchZeroOrOneResult<TableT>>);
//# sourceMappingURL=fetch-zero-or-one-by-ck.d.ts.map