import { ITable, TableUtil } from "../../../../table";
import { IConnection } from "../../../../execution";
export declare function existsBySk<TableT extends ITable>(connection: IConnection, table: TableT, sk: TableUtil.SuperKey<TableT>): (Promise<boolean>);
//# sourceMappingURL=exists-by-sk.d.ts.map