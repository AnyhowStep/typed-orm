import { ITable, TableUtil } from "../../../../table";
import { Row } from "../../../../row";
import { IConnection } from "../../../../execution";
export declare function fetchZeroOrOneByCk<TableT extends ITable>(connection: IConnection, table: TableT, ck: TableUtil.CandidateKey<TableT>): Promise<Row<TableT>>;
//# sourceMappingURL=fetch-zero-or-one-by-ck.d.ts.map