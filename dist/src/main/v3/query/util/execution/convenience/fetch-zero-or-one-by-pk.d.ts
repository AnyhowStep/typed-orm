import { ITable, TableUtil } from "../../../../table";
import { Row } from "../../../../row";
import { IConnection } from "../../../../execution";
import { CandidateKey } from "../../../../candidate-key";
export declare function fetchZeroOrOneByPk<TableT extends ITable & {
    primaryKey: CandidateKey;
}>(connection: IConnection, table: TableT, pk: TableUtil.PrimaryKey<TableT>): Promise<Row<TableT>>;
//# sourceMappingURL=fetch-zero-or-one-by-pk.d.ts.map