import { ITable } from "../../../../table";
import { Row } from "../../../../row";
import { IConnection } from "../../../../execution";
import { CandidateKey } from "../../../../candidate-key";
import { PrimaryKey } from "../../../../primary-key";
export declare function fetchZeroOrOneByPk<TableT extends ITable & {
    primaryKey: CandidateKey;
}>(connection: IConnection, table: TableT, pk: PrimaryKey<TableT>): Promise<Row<TableT>>;
//# sourceMappingURL=fetch-zero-or-one-by-pk.d.ts.map