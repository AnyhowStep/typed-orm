import { ITable } from "../../../table";
import { Insert, InsertModifier } from "../../insert";
export declare function replaceInto<TableT extends ITable & {
    insertAllowed: true;
}>(table: TableT): (Insert<{
    _table: TableT;
    _values: undefined;
    _modifier: InsertModifier.REPLACE;
}>);
//# sourceMappingURL=replace-into.d.ts.map