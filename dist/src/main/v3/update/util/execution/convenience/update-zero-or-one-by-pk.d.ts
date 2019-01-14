import { TableWithPk } from "../../../../table";
import { IConnection, UpdateZeroOrOneResult } from "../../../../execution";
import { SingleTableSetDelegateFromTable, AssertValidSingleTableSetDelegateFromTable_Hack } from "../../constructor";
import { PrimaryKey } from "../../../../primary-key";
export declare function updateZeroOrOneByPk<TableT extends TableWithPk, DelegateT extends SingleTableSetDelegateFromTable<TableT>>(connection: IConnection, table: TableT, pk: PrimaryKey<TableT>, delegate: DelegateT): (AssertValidSingleTableSetDelegateFromTable_Hack<TableT, DelegateT, Promise<UpdateZeroOrOneResult>>);
//# sourceMappingURL=update-zero-or-one-by-pk.d.ts.map