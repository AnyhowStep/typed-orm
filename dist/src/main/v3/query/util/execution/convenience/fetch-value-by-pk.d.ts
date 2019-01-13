import { ITable } from "../../../../table";
import { IConnection } from "../../../../execution";
import { RawExprUtil } from "../../../../raw-expr";
import { SelectValueDelegate, AssertValidSelectValueDelegate } from "./select-value-delegate";
import { Key } from "../../../../key";
import { PrimaryKey } from "../../../../primary-key";
export declare function fetchValueByPk<TableT extends ITable & {
    primaryKey: Key;
}, DelegateT extends SelectValueDelegate<TableT>>(connection: IConnection, table: TableT, pk: PrimaryKey<TableT>, delegate: AssertValidSelectValueDelegate<TableT, DelegateT>): (Promise<RawExprUtil.TypeOf<ReturnType<DelegateT>>>);
//# sourceMappingURL=fetch-value-by-pk.d.ts.map