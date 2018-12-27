import { IInsert, Insert, InsertModifier } from "../../insert";
export declare type Replace<InsertT extends IInsert> = (Insert<{
    _table: InsertT["_table"];
    _values: InsertT["_values"];
    _modifier: InsertModifier.REPLACE;
}>);
export declare function replace<InsertT extends IInsert>(insert: InsertT): Replace<InsertT>;
//# sourceMappingURL=replace.d.ts.map