import { TableWithPk, DeletableTable } from "../../../../table";
import { IConnection, DeleteZeroOrOneResult } from "../../../../execution";
import { PrimaryKey } from "../../../../primary-key";
export declare function deleteZeroOrOneByPk<TableT extends DeletableTable & TableWithPk>(connection: IConnection, table: TableT, pk: PrimaryKey<TableT>): (Promise<DeleteZeroOrOneResult>);
//# sourceMappingURL=delete-zero-or-one-by-pk.d.ts.map