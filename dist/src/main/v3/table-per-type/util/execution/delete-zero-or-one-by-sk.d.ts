import { ITable, TableUtil } from "../../../table";
import { IConnection, DeleteZeroOrOneResult } from "../../../execution";
import { SuperKey } from "../operation";
export declare function deleteZeroOrOneBySk<TableT extends ITable & {
    deleteAllowed: true;
}>(connection: IConnection, table: TableT & TableUtil.AssertHasCandidateKey<TableT>, sk: SuperKey<TableT>): (Promise<DeleteZeroOrOneResult>);
