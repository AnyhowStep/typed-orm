import { TableWithPk } from "../../../../table";
import { IConnection } from "../../../../execution";
import { PrimaryKey } from "../../../../primary-key";
export declare function assertExistsByPk<TableT extends TableWithPk>(connection: IConnection, table: TableT, pk: PrimaryKey<TableT>): (Promise<void>);
//# sourceMappingURL=assert-exists-by-pk.d.ts.map