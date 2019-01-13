import { ITable, TableUtil } from "../../../../table";
import { IConnection, DeleteZeroOrOneResult } from "../../../../execution";
import { SuperKey } from "../../../../super-key";
export declare function deleteZeroOrOneBySk<TableT extends ITable & {
    deleteAllowed: true;
}>(connection: IConnection, table: TableT & TableUtil.AssertHasCandidateKey<TableT>, sk: SuperKey<TableT>): (Promise<DeleteZeroOrOneResult>);
//# sourceMappingURL=delete-zero-or-one-by-sk.d.ts.map