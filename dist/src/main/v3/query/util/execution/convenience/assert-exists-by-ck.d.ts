import { ITable } from "../../../../table";
import { IConnection } from "../../../../execution";
import { CandidateKey } from "../../../../candidate-key";
export declare function assertExistsByCk<TableT extends ITable>(connection: IConnection, table: TableT, ck: CandidateKey<TableT>): (Promise<void>);
//# sourceMappingURL=assert-exists-by-ck.d.ts.map