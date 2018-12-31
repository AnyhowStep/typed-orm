import { ITable, TableUtil } from "../../../../table";
import { IConnection, UpdateOneResult } from "../../../../execution";
import { SingleTableSetDelegateFromTable, AssertValidSingleTableSetDelegateFromTable_Hack } from "../../constructor";
import { CandidateKey } from "../../../../candidate-key";
export declare function updateOneByPk<TableT extends ITable & {
    primaryKey: CandidateKey;
}, DelegateT extends SingleTableSetDelegateFromTable<TableT>>(connection: IConnection, table: TableT, pk: TableUtil.PrimaryKey<TableT>, delegate: DelegateT): (AssertValidSingleTableSetDelegateFromTable_Hack<TableT, DelegateT, Promise<UpdateOneResult>>);
//# sourceMappingURL=update-one-by-pk.d.ts.map