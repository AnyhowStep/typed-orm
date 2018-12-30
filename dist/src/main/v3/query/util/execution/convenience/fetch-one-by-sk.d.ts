import { ITable, TableUtil } from "../../../../table";
import { TypeMapUtil } from "../../../../type-map";
import { IConnection } from "../../../../execution";
export declare function fetchOneBySk<TableT extends ITable>(connection: IConnection, table: TableT, sk: TableUtil.SuperKey<TableT>): Promise<TypeMapUtil.FromTable<TableT>>;
//# sourceMappingURL=fetch-one-by-sk.d.ts.map