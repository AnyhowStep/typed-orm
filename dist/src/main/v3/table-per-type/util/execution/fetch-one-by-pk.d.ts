import { ITable } from "../../../table";
import { IConnection } from "../../../execution";
import { FetchOneResult } from "./fetch-one";
import { CandidateKey } from "../../../candidate-key";
import { PrimaryKey } from "../../../primary-key";
export declare function fetchOneByPk<TableT extends ITable & {
    primaryKey: CandidateKey;
}>(connection: IConnection, table: TableT, pk: PrimaryKey<TableT>): (Promise<FetchOneResult<TableT>>);
//# sourceMappingURL=fetch-one-by-pk.d.ts.map