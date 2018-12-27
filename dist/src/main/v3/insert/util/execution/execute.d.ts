import { ITable } from "../../../table";
import { IInsert, InsertRow } from "../../insert";
import { IConnection, InsertResult } from "../../../execution";
export declare type Execute<_InsertT extends IInsert & {
    _values: InsertRow<ITable>[];
}> = (InsertResult);
export declare function execute<InsertT extends IInsert & {
    _values: InsertRow<ITable>[];
}>(insert: InsertT, connection: IConnection): (Promise<Execute<InsertT>>);
//# sourceMappingURL=execute.d.ts.map