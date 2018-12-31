import { ITable, TableUtil } from "../../../../table";
import { IConnection } from "../../../../execution";
import { CandidateKey } from "../../../../candidate-key";
export declare function existsByPk<TableT extends ITable & {
    primaryKey: CandidateKey;
}>(connection: IConnection, table: TableT, pk: TableUtil.PrimaryKey<TableT>): (Promise<boolean>);
//# sourceMappingURL=exists-by-pk.d.ts.map