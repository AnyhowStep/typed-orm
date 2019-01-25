import { TableWithPk } from "../../../../table";
import { IConnection } from "../../../../execution";
import { PrimaryKey } from "../../../../primary-key";
export declare function existsByPk<TableT extends TableWithPk>(connection: IConnection, table: TableT, pk: PrimaryKey<TableT>): (Promise<boolean>);
