import { InsertableTable } from "../../../table";
import { Insert, InsertModifier } from "../../insert";
export declare function replaceInto<TableT extends InsertableTable>(table: TableT): (Insert<{
    _table: TableT;
    _values: undefined;
    _modifier: InsertModifier.REPLACE;
}>);
