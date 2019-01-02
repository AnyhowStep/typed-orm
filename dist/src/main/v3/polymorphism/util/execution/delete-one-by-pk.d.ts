import { ITable, TableUtil } from "../../../table";
import { IConnection, DeleteOneResult } from "../../../execution";
import { CandidateKey } from "../../../candidate-key";
export declare function deleteOneByPk<TableT extends ITable & {
    deleteAllowed: true;
    primaryKey: CandidateKey;
}>(connection: IConnection, table: TableT, pk: TableUtil.PrimaryKey<TableT>): (Promise<DeleteOneResult>);
//# sourceMappingURL=delete-one-by-pk.d.ts.map