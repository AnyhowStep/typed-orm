import { ITable } from "../../../table";
import { IConnection, DeleteOneResult } from "../../../execution";
import { Key } from "../../../key";
import { PrimaryKey } from "../../../primary-key";
export declare function deleteOneByPk<TableT extends ITable & {
    deleteAllowed: true;
    primaryKey: Key;
}>(connection: IConnection, table: TableT, pk: PrimaryKey<TableT>): (Promise<DeleteOneResult>);
