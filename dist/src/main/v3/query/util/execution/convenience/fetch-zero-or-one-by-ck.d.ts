import { ITable } from "../../../../table";
import { Row } from "../../../../row";
import { IConnection } from "../../../../execution";
import { CandidateKey } from "../../../../candidate-key";
export declare function fetchZeroOrOneByCk<TableT extends ITable>(connection: IConnection, table: TableT, ck: CandidateKey<TableT>): Promise<Row<TableT> | undefined>;
//# sourceMappingURL=fetch-zero-or-one-by-ck.d.ts.map