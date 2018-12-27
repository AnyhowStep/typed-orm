import { ITable, TableUtil } from "../../../../table";
import { TypeMapUtil } from "../../../../type-map";
import { IConnection } from "../../../../execution";
export declare function fetchZeroOrOneByCk<TableT extends ITable>(connection: IConnection, table: TableT, ck: TableUtil.CandidateKey<TableT>): Promise<TypeMapUtil.FromTable<TableT>>;
//# sourceMappingURL=fetch-zero-or-one-by-ck.d.ts.map