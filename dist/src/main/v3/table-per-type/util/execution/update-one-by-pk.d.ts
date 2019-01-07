import { ITable, TableUtil } from "../../../table";
import { IConnection, UpdateOneResult } from "../../../execution";
import { SetDelegate, AssertValidSetDelegate_Hack } from "./update";
import { CandidateKey } from "../../../candidate-key";
export declare function updateOneByPk<TableT extends ITable & {
    primaryKey: CandidateKey;
}, DelegateT extends SetDelegate<TableT>>(connection: IConnection, table: TableT, pk: TableUtil.PrimaryKey<TableT>, delegate: DelegateT): (AssertValidSetDelegate_Hack<TableT, DelegateT, Promise<UpdateOneResult>>);
//# sourceMappingURL=update-one-by-pk.d.ts.map