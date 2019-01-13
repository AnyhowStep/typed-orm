import { ITable } from "../../../table";
import { IConnection, DeleteZeroOrOneResult } from "../../../execution";
import { Key } from "../../../key";
import { PrimaryKey } from "../../../primary-key";
export declare function deleteZeroOrOneByPk<TableT extends ITable & {
    deleteAllowed: true;
    primaryKey: Key;
}>(connection: IConnection, table: TableT, pk: PrimaryKey<TableT>): (Promise<DeleteZeroOrOneResult>);
//# sourceMappingURL=delete-zero-or-one-by-pk.d.ts.map