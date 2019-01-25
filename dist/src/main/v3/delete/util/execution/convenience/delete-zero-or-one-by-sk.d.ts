import { DeletableTable, TableUtil } from "../../../../table";
import { IConnection, DeleteZeroOrOneResult } from "../../../../execution";
import { SuperKey } from "../../../../super-key";
export declare function deleteZeroOrOneBySk<TableT extends DeletableTable>(connection: IConnection, table: TableT & TableUtil.AssertHasCandidateKey<TableT>, sk: SuperKey<TableT>): (Promise<DeleteZeroOrOneResult>);
