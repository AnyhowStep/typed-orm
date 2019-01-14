import { InsertableTable } from "../../../../table";
import { IConnection } from "../../../../execution";
import { IInsert, InsertRow, InsertModifier } from "../../../insert";
import { Execute } from "../execute";
export declare type InsertIgnoreResult<TableT extends InsertableTable> = (Execute<IInsert<{
    _table: TableT;
    _values: InsertRow<TableT>[];
    _modifier: InsertModifier.IGNORE;
}>>);
export declare function insertIgnore<TableT extends InsertableTable>(connection: IConnection, table: TableT, insertRow: InsertRow<TableT>): (Promise<InsertIgnoreResult<TableT>>);
//# sourceMappingURL=insert-ignore.d.ts.map