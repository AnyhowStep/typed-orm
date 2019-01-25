import { ITable } from "../../../../table";
import { IConnection } from "../../../../execution";
import { CandidateKey } from "../../../../candidate-key";
export declare function existsByCk<TableT extends ITable>(connection: IConnection, table: TableT, ck: CandidateKey<TableT>): (Promise<boolean>);
