import { InsertableTable } from "../../../../table";
import { IConnection } from "../../../../execution";
import { IInsert, InsertRow } from "../../../insert";
import { Execute } from "../execute";
export declare type InsertResult<TableT extends InsertableTable> = (Execute<IInsert<{
    _table: TableT;
    _values: InsertRow<TableT>[];
    _modifier: undefined;
}>>);
export declare function insert<TableT extends InsertableTable>(connection: IConnection, table: TableT, insertRow: InsertRow<TableT>): (Promise<InsertResult<TableT>>);
