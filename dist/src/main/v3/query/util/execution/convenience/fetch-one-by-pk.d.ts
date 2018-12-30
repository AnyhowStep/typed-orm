import { ITable, TableUtil } from "../../../../table";
import { TypeMapUtil } from "../../../../type-map";
import { IConnection } from "../../../../execution";
import { CandidateKey } from "../../../../candidate-key";
export declare function fetchOneByPk<TableT extends ITable & {
    primaryKey: CandidateKey;
}>(connection: IConnection, table: TableT, pk: TableUtil.PrimaryKey<TableT>): Promise<TypeMapUtil.FromTable<TableT>>;
//# sourceMappingURL=fetch-one-by-pk.d.ts.map