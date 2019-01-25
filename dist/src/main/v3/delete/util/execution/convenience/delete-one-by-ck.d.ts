import { DeletableTable, TableUtil } from "../../../../table";
import { IConnection, DeleteOneResult } from "../../../../execution";
import { CandidateKey } from "../../../../candidate-key";
export declare function deleteOneByCk<TableT extends DeletableTable>(connection: IConnection, table: TableT & TableUtil.AssertHasCandidateKey<TableT>, ck: CandidateKey<TableT>): (Promise<DeleteOneResult>);
