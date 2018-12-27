import { IInsert, Insert, InsertModifier } from "../../insert";
export declare type Ignore<InsertT extends IInsert> = (Insert<{
    _table: InsertT["_table"];
    _values: InsertT["_values"];
    _modifier: InsertModifier.IGNORE;
}>);
export declare function ignore<InsertT extends IInsert>(insert: InsertT): Ignore<InsertT>;
//# sourceMappingURL=ignore.d.ts.map