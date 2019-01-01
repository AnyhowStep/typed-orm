import { ITable, TableUtil } from "../../../../table";
import { IConnection, DeleteOneResult } from "../../../../execution";
export declare function deleteOneBySk<TableT extends ITable & {
    deleteAllowed: true;
}>(connection: IConnection, table: TableT & TableUtil.AssertHasCandidateKey<TableT>, sk: TableUtil.SuperKey<TableT>): (Promise<DeleteOneResult>);
//# sourceMappingURL=delete-one-by-sk.d.ts.map