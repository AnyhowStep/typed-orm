import { ITable, TableUtil } from "../../../table";
import { IConnection, DeleteZeroOrOneResult } from "../../../execution";
export declare function deleteZeroOrOneByCk<TableT extends ITable & {
    deleteAllowed: true;
}>(connection: IConnection, table: TableT & TableUtil.AssertHasCandidateKey<TableT>, ck: TableUtil.CandidateKey<TableT>): (Promise<DeleteZeroOrOneResult>);
//# sourceMappingURL=delete-zero-or-one-by-ck.d.ts.map