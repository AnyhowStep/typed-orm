import { ITable, TableUtil } from "../../../../table";
import { Row } from "../../../../row";
import { IConnection } from "../../../../execution";
import { CandidateKey } from "../../../../candidate-key";
export declare function fetchOneByPk<TableT extends ITable & {
    primaryKey: CandidateKey;
}>(connection: IConnection, table: TableT, pk: TableUtil.PrimaryKey<TableT>): Promise<Row<TableT>>;
//# sourceMappingURL=fetch-one-by-pk.d.ts.map