import { InsertableTable } from "../../../table";
import { Insert } from "../../insert";
export declare function insertInto<TableT extends InsertableTable>(table: TableT): (Insert<{
    _table: TableT;
    _values: undefined;
    _modifier: undefined;
}>);
