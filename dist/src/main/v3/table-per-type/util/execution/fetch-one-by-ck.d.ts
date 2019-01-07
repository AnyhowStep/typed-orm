import { ITable, TableUtil } from "../../../table";
import { IConnection } from "../../../execution";
import { FetchOneResult } from "./fetch-one";
export declare function fetchOneByCk<TableT extends ITable>(connection: IConnection, table: TableT & TableUtil.AssertHasCandidateKey<TableT>, ck: TableUtil.CandidateKey<TableT>): (Promise<FetchOneResult<TableT>>);
//# sourceMappingURL=fetch-one-by-ck.d.ts.map