import { ITable } from "../../../../table";
import { IConnection } from "../../../../execution";
import { SuperKey } from "../../../../super-key";
export declare function assertExistsBySk<TableT extends ITable>(connection: IConnection, table: TableT, sk: SuperKey<TableT>): (Promise<void>);
//# sourceMappingURL=assert-exists-by-sk.d.ts.map