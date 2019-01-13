import { ITable, TableUtil } from "../../../../table";
import { IConnection } from "../../../../execution";
import { SingleTableSetDelegateFromTable, AssertValidSingleTableSetDelegateFromTable_Hack } from "../../constructor";
import { UpdateAndFetchZeroOrOneResult } from "./update-and-fetch-zero-or-one";
import { Key } from "../../../../key";
import { PrimaryKey } from "../../../../primary-key";
export declare function updateAndFetchZeroOrOneByPk<TableT extends ITable & {
    primaryKey: Key;
}, DelegateT extends SingleTableSetDelegateFromTable<TableT>>(connection: IConnection, table: TableT & TableUtil.AssertHasCandidateKey<TableT>, pk: PrimaryKey<TableT>, delegate: DelegateT): (AssertValidSingleTableSetDelegateFromTable_Hack<TableT, DelegateT, Promise<UpdateAndFetchZeroOrOneResult<TableT, DelegateT>>>);
//# sourceMappingURL=update-and-fetch-zero-or-one-by-pk.d.ts.map