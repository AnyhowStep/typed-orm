import { ITable } from "../../../table";
import { IInsert, InsertRow } from "../../insert";
import { IConnection } from "../../../execution";
import { TypeMapUtil } from "../../../type-map";
export declare function executeAndFetch<InsertT extends IInsert & {
    _values: InsertRow<ITable>[];
}>(insert: InsertT, connection: (IConnection & (InsertT["_table"]["candidateKeys"][number] extends never ? ["Table", InsertT["_table"]["alias"], "has no candidate keys"] : unknown))): (Promise<TypeMapUtil.FromTable<InsertT["_table"]>>);
//# sourceMappingURL=execute-and-fetch.d.ts.map