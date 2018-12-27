import { ITable, TableUtil } from "../../../../table";
import { IConnection } from "../../../../execution";
import { InsertRow } from "../../../insert";
export declare function insertAndFetch<TableT extends ITable & {
    insertAllowed: true;
}>(connection: (IConnection & TableUtil.AssertHasCandidateKey<TableT>), table: TableT, insertRow: InsertRow<TableT>): Promise<{ readonly [columnName in Extract<keyof TableT["columns"], string>]: ReturnType<TableT["columns"][columnName]["assertDelegate"]>; }>;
//# sourceMappingURL=insert-and-fetch.d.ts.map