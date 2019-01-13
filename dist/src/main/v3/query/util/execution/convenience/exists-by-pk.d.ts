import { ITable } from "../../../../table";
import { IConnection } from "../../../../execution";
import { CandidateKey } from "../../../../candidate-key";
import { PrimaryKey } from "../../../../primary-key";
export declare function existsByPk<TableT extends ITable & {
    primaryKey: CandidateKey;
}>(connection: IConnection, table: TableT, pk: PrimaryKey<TableT>): (Promise<boolean>);
//# sourceMappingURL=exists-by-pk.d.ts.map