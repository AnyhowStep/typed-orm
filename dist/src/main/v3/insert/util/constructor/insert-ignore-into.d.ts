import { InsertableTable } from "../../../table";
import { Insert, InsertModifier } from "../../insert";
export declare function insertIgnoreInto<TableT extends InsertableTable>(table: TableT): (Insert<{
    _table: TableT;
    _values: undefined;
    _modifier: InsertModifier.IGNORE;
}>);
//# sourceMappingURL=insert-ignore-into.d.ts.map