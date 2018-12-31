import { ITable, TableUtil } from "../../../../table";
import { IConnection } from "../../../../execution";
export declare function existsByCk<TableT extends ITable>(connection: IConnection, table: TableT, ck: TableUtil.CandidateKey<TableT>): (Promise<boolean>);
//# sourceMappingURL=exists-by-ck.d.ts.map