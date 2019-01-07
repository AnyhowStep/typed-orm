import { ITable, TableUtil } from "../../../table";
import { IConnection } from "../../../execution";
import { FetchZeroOrOneResult } from "./fetch-zero-or-one";
import { CandidateKey } from "../../../candidate-key";
export declare function fetchZeroOrOneByPk<TableT extends ITable & {
    primaryKey: CandidateKey;
}>(connection: IConnection, table: TableT, pk: TableUtil.PrimaryKey<TableT>): (Promise<FetchZeroOrOneResult<TableT>>);
//# sourceMappingURL=fetch-zero-or-one-by-pk.d.ts.map