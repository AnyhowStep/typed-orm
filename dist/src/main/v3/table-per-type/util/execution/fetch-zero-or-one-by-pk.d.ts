import { ITable } from "../../../table";
import { IConnection } from "../../../execution";
import { FetchZeroOrOneResult } from "./fetch-zero-or-one";
import { Key } from "../../../key";
import { PrimaryKey } from "../../../primary-key";
export declare function fetchZeroOrOneByPk<TableT extends ITable & {
    primaryKey: Key;
}>(connection: IConnection, table: TableT, pk: PrimaryKey<TableT>): (Promise<FetchZeroOrOneResult<TableT>>);
