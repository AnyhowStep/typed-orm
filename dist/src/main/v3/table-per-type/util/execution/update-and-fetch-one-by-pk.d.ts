import { ITable } from "../../../table";
import { IConnection } from "../../../execution";
import { SetDelegate, AssertValidSetDelegate_Hack } from "./update";
import { UpdateAndFetchOneResult } from "./update-and-fetch-one";
import { Key } from "../../../key";
import { PrimaryKey } from "../../../primary-key";
export declare function updateAndFetchOneByPk<TableT extends ITable & {
    primaryKey: Key;
}, DelegateT extends SetDelegate<TableT>>(connection: IConnection, table: TableT, pk: PrimaryKey<TableT>, delegate: DelegateT): (AssertValidSetDelegate_Hack<TableT, DelegateT, Promise<UpdateAndFetchOneResult<TableT, DelegateT>>>);
