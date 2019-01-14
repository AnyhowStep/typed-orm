import { TableWithPk } from "../../../../table";
import { Row } from "../../../../row";
import { IConnection } from "../../../../execution";
import { PrimaryKey } from "../../../../primary-key";
export declare function fetchOneByPk<TableT extends TableWithPk>(connection: IConnection, table: TableT, pk: PrimaryKey<TableT>): Promise<Row<TableT>>;
//# sourceMappingURL=fetch-one-by-pk.d.ts.map