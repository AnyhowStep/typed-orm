import { TableWithPk, DeletableTable } from "../../../../table";
import { IConnection, DeleteOneResult } from "../../../../execution";
import { PrimaryKey } from "../../../../primary-key";
export declare function deleteOneByPk<TableT extends DeletableTable & TableWithPk>(connection: IConnection, table: TableT, pk: PrimaryKey<TableT>): (Promise<DeleteOneResult>);
