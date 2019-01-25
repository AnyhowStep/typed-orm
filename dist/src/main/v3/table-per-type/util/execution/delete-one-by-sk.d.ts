import { ITable, TableUtil } from "../../../table";
import { IConnection, DeleteOneResult } from "../../../execution";
import { SuperKey } from "../operation";
export declare function deleteOneBySk<TableT extends ITable & {
    deleteAllowed: true;
}>(connection: IConnection, table: TableT & TableUtil.AssertHasCandidateKey<TableT>, sk: SuperKey<TableT>): (Promise<DeleteOneResult>);
