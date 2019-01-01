import { ITable, TableUtil } from "../../../../table";
import { IConnection, DeleteZeroOrOneResult } from "../../../../execution";
import { CandidateKey } from "../../../../candidate-key";
export declare function deleteZeroOrOneByPk<TableT extends ITable & {
    deleteAllowed: true;
    primaryKey: CandidateKey;
}>(connection: IConnection, table: TableT, pk: TableUtil.PrimaryKey<TableT>): (Promise<DeleteZeroOrOneResult>);
//# sourceMappingURL=delete-zero-or-one-by-pk.d.ts.map