import { ITable, TableUtil } from "../../../table";
import { IConnection } from "../../../execution";
import { FetchOneResult } from "./fetch-one";
import { CandidateKey } from "../../../candidate-key";
export declare function fetchOneByCk<TableT extends ITable>(connection: IConnection, table: TableT & TableUtil.AssertHasCandidateKey<TableT>, ck: CandidateKey<TableT>): (Promise<FetchOneResult<TableT>>);
