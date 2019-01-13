import { ITable, TableUtil } from "../../../../table";
import { Row } from "../../../../row";
import { IConnection } from "../../../../execution";
export declare function fetchOneBySk<TableT extends ITable>(connection: IConnection, table: TableT, sk: TableUtil.SuperKey<TableT>): Promise<Row<TableT>>;
//# sourceMappingURL=fetch-one-by-sk.d.ts.map