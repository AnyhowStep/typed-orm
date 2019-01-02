import { ITable, TableUtil } from "../../../table";
import { IConnection } from "../../../execution";
import { SetDelegate, AssertValidSetDelegate_Hack } from "./update";
import { UpdateAndFetchZeroOrOneResult } from "./update-and-fetch-zero-or-one";
import { CandidateKey } from "../../../candidate-key";
export declare function updateAndFetchZeroOrOneByPk<TableT extends ITable & {
    primaryKey: CandidateKey;
}, DelegateT extends SetDelegate<TableT>>(connection: IConnection, table: TableT, pk: TableUtil.PrimaryKey<TableT>, delegate: DelegateT): (AssertValidSetDelegate_Hack<TableT, DelegateT, Promise<UpdateAndFetchZeroOrOneResult<TableT, DelegateT>>>);
//# sourceMappingURL=update-and-fetch-zero-or-one-by-pk.d.ts.map