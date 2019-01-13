import { ITable } from "../../../../table";
import { Row } from "../../../../row";
import { IConnection } from "../../../../execution";
import { Key } from "../../../../key";
import { PrimaryKey } from "../../../../primary-key";
export declare function fetchOneByPk<TableT extends ITable & {
    primaryKey: Key;
}>(connection: IConnection, table: TableT, pk: PrimaryKey<TableT>): Promise<Row<TableT>>;
//# sourceMappingURL=fetch-one-by-pk.d.ts.map