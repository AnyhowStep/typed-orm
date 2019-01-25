import { InsertableTable } from "../../../../table";
import { IConnection } from "../../../../execution";
import { IInsert, InsertRow, InsertModifier } from "../../../insert";
import { Execute } from "../execute";
export declare type ReplaceResult<TableT extends InsertableTable> = (Execute<IInsert<{
    _table: TableT;
    _values: InsertRow<TableT>[];
    _modifier: InsertModifier.REPLACE;
}>>);
export declare function replace<TableT extends InsertableTable>(connection: IConnection, table: TableT, insertRow: InsertRow<TableT>): (Promise<ReplaceResult<TableT>>);
