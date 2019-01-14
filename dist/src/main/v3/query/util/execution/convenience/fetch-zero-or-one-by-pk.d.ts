import { TableWithPk } from "../../../../table";
import { Row } from "../../../../row";
import { IConnection } from "../../../../execution";
import { PrimaryKey } from "../../../../primary-key";
export declare function fetchZeroOrOneByPk<TableT extends TableWithPk>(connection: IConnection, table: TableT, pk: PrimaryKey<TableT>): Promise<Row<TableT> | undefined>;
//# sourceMappingURL=fetch-zero-or-one-by-pk.d.ts.map