import { ITable, TableUtil } from "../../../table";
import { IConnection } from "../../../execution";
import { SetDelegate, AssertValidSetDelegate_Hack } from "./update";
import { UpdateAndFetchOneResult } from "./update-and-fetch-one";
import { CandidateKey } from "../../../candidate-key";
export declare function updateAndFetchOneByPk<TableT extends ITable & {
    primaryKey: CandidateKey;
}, DelegateT extends SetDelegate<TableT>>(connection: IConnection, table: TableT, pk: TableUtil.PrimaryKey<TableT>, delegate: DelegateT): (AssertValidSetDelegate_Hack<TableT, DelegateT, Promise<UpdateAndFetchOneResult<TableT, DelegateT>>>);
//# sourceMappingURL=update-and-fetch-one-by-pk.d.ts.map