import { ITable, TableUtil } from "../../../../table";
import { IConnection } from "../../../../execution";
export declare function assertExistsByCk<TableT extends ITable>(connection: IConnection, table: TableT, ck: TableUtil.CandidateKey<TableT>): (Promise<void>);
//# sourceMappingURL=assert-exists-by-ck.d.ts.map