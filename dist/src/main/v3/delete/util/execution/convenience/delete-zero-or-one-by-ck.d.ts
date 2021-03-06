import { DeletableTable, TableUtil } from "../../../../table";
import { IConnection, DeleteZeroOrOneResult } from "../../../../execution";
import { CandidateKey } from "../../../../candidate-key";
export declare function deleteZeroOrOneByCk<TableT extends DeletableTable>(connection: IConnection, table: TableT & TableUtil.AssertHasCandidateKey<TableT>, ck: CandidateKey<TableT>): (Promise<DeleteZeroOrOneResult>);
