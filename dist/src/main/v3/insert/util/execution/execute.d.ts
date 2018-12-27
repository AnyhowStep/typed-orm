import { ITable } from "../../../table";
import { IInsert, InsertRow, InsertModifier } from "../../insert";
import { IConnection, InsertResult } from "../../../execution";
export declare type Execute<InsertT extends IInsert & {
    _values: InsertRow<ITable>[];
}> = (InsertResult & (InsertT["_table"]["autoIncrement"] extends string ? {
    [k in InsertT["_table"]["autoIncrement"]]: (InsertModifier.IGNORE extends InsertT["_modifier"] ? undefined | bigint : undefined extends InsertT["_modifier"] ? bigint : InsertModifier.REPLACE extends InsertT["_modifier"] ? bigint : never);
} : {}));
export declare function execute<InsertT extends IInsert & {
    _values: InsertRow<ITable>[];
}>(insert: InsertT, connection: IConnection): (Promise<Execute<InsertT>>);
//# sourceMappingURL=execute.d.ts.map