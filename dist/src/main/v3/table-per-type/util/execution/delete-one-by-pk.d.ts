import { ITable } from "../../../table";
import { IConnection, DeleteOneResult } from "../../../execution";
import { CandidateKey } from "../../../candidate-key";
import { PrimaryKey } from "../../../primary-key";
export declare function deleteOneByPk<TableT extends ITable & {
    deleteAllowed: true;
    primaryKey: CandidateKey;
}>(connection: IConnection, table: TableT, pk: PrimaryKey<TableT>): (Promise<DeleteOneResult>);
//# sourceMappingURL=delete-one-by-pk.d.ts.map