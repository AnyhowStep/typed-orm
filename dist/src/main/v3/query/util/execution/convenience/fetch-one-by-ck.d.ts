import { ITable, TableUtil } from "../../../../table";
import { TypeMapUtil } from "../../../../type-map";
import { IConnection } from "../../../../execution";
export declare function fetchOneByCk<TableT extends ITable>(connection: IConnection, table: TableT, ck: TableUtil.CandidateKey<TableT>): Promise<TypeMapUtil.FromTable<TableT>>;
//# sourceMappingURL=fetch-one-by-ck.d.ts.map