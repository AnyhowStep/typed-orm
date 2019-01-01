import { ITable, TableUtil } from "../../../../table";
import { IConnection, DeleteOneResult } from "../../../../execution";
export declare function deleteOneByCk<TableT extends ITable & {
    deleteAllowed: true;
}>(connection: IConnection, table: TableT & TableUtil.AssertHasCandidateKey<TableT>, ck: TableUtil.CandidateKey<TableT>): (Promise<DeleteOneResult>);
//# sourceMappingURL=delete-one-by-ck.d.ts.map