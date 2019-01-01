import { ITable, TableUtil } from "../../../../table";
import { IConnection } from "../../../../execution";
import { SingleTableSetDelegateFromTable, AssertValidSingleTableSetDelegateFromTable_Hack } from "../../constructor";
import { UpdateAndFetchOneResult } from "./update-and-fetch-one";
import { CandidateKey } from "../../../../candidate-key";
export declare function updateAndFetchOneByPk<TableT extends ITable & {
    primaryKey: CandidateKey;
}, DelegateT extends SingleTableSetDelegateFromTable<TableT>>(connection: IConnection, table: TableT & TableUtil.AssertHasCandidateKey<TableT>, pk: TableUtil.PrimaryKey<TableT>, delegate: DelegateT): (AssertValidSingleTableSetDelegateFromTable_Hack<TableT, DelegateT, Promise<UpdateAndFetchOneResult<TableT, DelegateT>>>);
//# sourceMappingURL=update-and-fetch-one-by-pk.d.ts.map