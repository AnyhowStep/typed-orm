import { ITable } from "../../../table";
import { IConnection } from "../../../execution";
import { FetchZeroOrOneResult } from "./fetch-zero-or-one";
import { CandidateKey } from "../../../candidate-key";
import { PrimaryKey } from "../../../primary-key";
export declare function fetchZeroOrOneByPk<TableT extends ITable & {
    primaryKey: CandidateKey;
}>(connection: IConnection, table: TableT, pk: PrimaryKey<TableT>): (Promise<FetchZeroOrOneResult<TableT>>);
//# sourceMappingURL=fetch-zero-or-one-by-pk.d.ts.map