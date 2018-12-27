import { ITable } from "../../../table";
import { Insert } from "../../insert";
export declare function insertInto<TableT extends ITable & {
    insertAllowed: true;
}>(table: TableT): (Insert<{
    _table: TableT;
    _values: undefined;
    _modifier: undefined;
}>);
//# sourceMappingURL=insert-into.d.ts.map