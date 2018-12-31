import { ITable, TableUtil } from "../../../../table";
import { IConnection } from "../../../../execution";
export declare function assertExistsBySk<TableT extends ITable>(connection: IConnection, table: TableT, sk: TableUtil.SuperKey<TableT>): (Promise<void>);
//# sourceMappingURL=assert-exists-by-sk.d.ts.map