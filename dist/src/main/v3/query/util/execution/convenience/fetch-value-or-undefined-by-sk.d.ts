import { ITable } from "../../../../table";
import { IConnection } from "../../../../execution";
import { RawExprUtil } from "../../../../raw-expr";
import { SelectValueDelegate, AssertValidSelectValueDelegate } from "./select-value-delegate";
import { SuperKey } from "../../../../super-key";
export declare function fetchValueOrUndefinedBySk<TableT extends ITable, DelegateT extends SelectValueDelegate<TableT>>(connection: IConnection, table: TableT, sk: SuperKey<TableT>, delegate: AssertValidSelectValueDelegate<TableT, DelegateT>): (Promise<RawExprUtil.TypeOf<ReturnType<DelegateT>> | undefined>);
//# sourceMappingURL=fetch-value-or-undefined-by-sk.d.ts.map