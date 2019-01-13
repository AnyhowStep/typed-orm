import { ITable } from "../../../../table";
import { IConnection } from "../../../../execution";
import { SuperKey } from "../../../../super-key";
export declare function existsBySk<TableT extends ITable>(connection: IConnection, table: TableT, sk: SuperKey<TableT>): (Promise<boolean>);
//# sourceMappingURL=exists-by-sk.d.ts.map