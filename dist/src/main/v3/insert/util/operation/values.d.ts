import { IInsert, Insert, InsertRow } from "../../insert";
export declare type Values<InsertT extends IInsert> = (Insert<{
    _table: InsertT["_table"];
    _values: InsertRow<InsertT["_table"]>[];
    _modifier: InsertT["_modifier"];
}>);
export declare function values<InsertT extends IInsert>(insert: InsertT, ...values: InsertRow<InsertT["_table"]>[]): Values<InsertT>;
