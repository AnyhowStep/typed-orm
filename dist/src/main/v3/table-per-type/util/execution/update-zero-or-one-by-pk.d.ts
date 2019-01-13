import { ITable } from "../../../table";
import { IConnection, UpdateZeroOrOneResult } from "../../../execution";
import { SetDelegate, AssertValidSetDelegate_Hack } from "./update";
import { CandidateKey } from "../../../candidate-key";
import { PrimaryKey } from "../../../primary-key";
export declare function updateZeroOrOneByPk<TableT extends ITable & {
    primaryKey: CandidateKey;
}, DelegateT extends SetDelegate<TableT>>(connection: IConnection, table: TableT, pk: PrimaryKey<TableT>, delegate: DelegateT): (AssertValidSetDelegate_Hack<TableT, DelegateT, Promise<UpdateZeroOrOneResult>>);
//# sourceMappingURL=update-zero-or-one-by-pk.d.ts.map