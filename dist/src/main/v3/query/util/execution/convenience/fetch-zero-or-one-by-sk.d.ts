import { ITable, TableUtil } from "../../../../table";
import { TypeMapUtil } from "../../../../type-map";
import { IConnection } from "../../../../execution";
export declare function fetchZeroOrOneBySk<TableT extends ITable>(connection: IConnection, table: TableT, sk: TableUtil.SuperKey<TableT>): Promise<TypeMapUtil.FromTable<TableT>>;
//# sourceMappingURL=fetch-zero-or-one-by-sk.d.ts.map