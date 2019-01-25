import { ExecutableInsert, InsertModifier } from "../../insert";
import { IConnection, InsertResult } from "../../../execution";
export declare type Execute<InsertT extends ExecutableInsert> = (InsertResult & (InsertT["_table"]["autoIncrement"] extends string ? {
    [k in InsertT["_table"]["autoIncrement"]]: (InsertModifier.IGNORE extends InsertT["_modifier"] ? undefined | bigint : undefined extends InsertT["_modifier"] ? bigint : InsertModifier.REPLACE extends InsertT["_modifier"] ? bigint : never);
} : {}));
export declare function execute<InsertT extends ExecutableInsert>(insert: InsertT, connection: IConnection): (Promise<Execute<InsertT>>);
