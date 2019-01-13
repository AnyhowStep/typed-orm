import { ITable } from "../../../../table";
import { Row } from "../../../../row";
import { IConnection } from "../../../../execution";
import { SuperKey } from "../../../../super-key";
export declare function fetchOneBySk<TableT extends ITable>(connection: IConnection, table: TableT, sk: SuperKey<TableT>): Promise<Row<TableT>>;
//# sourceMappingURL=fetch-one-by-sk.d.ts.map