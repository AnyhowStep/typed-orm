import { ITable, TableUtil } from "../../../../table";
import { Row } from "../../../../row";
import { IConnection } from "../../../../execution";
export declare function fetchZeroOrOneBySk<TableT extends ITable>(connection: IConnection, table: TableT, sk: TableUtil.SuperKey<TableT>): Promise<Row<TableT>>;
//# sourceMappingURL=fetch-zero-or-one-by-sk.d.ts.map