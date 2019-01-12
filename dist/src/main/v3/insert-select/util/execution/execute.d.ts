import { InsertSelectModifier, ExecutableInsertSelect } from "../../insert-select";
import { IConnection, InsertResult } from "../../../execution";
export declare type Execute<InsertT extends ExecutableInsertSelect> = (InsertResult & (InsertT["_table"]["autoIncrement"] extends string ? {
    [k in InsertT["_table"]["autoIncrement"]]: (InsertSelectModifier.IGNORE extends InsertT["_modifier"] ? undefined | bigint : undefined extends InsertT["_modifier"] ? bigint : InsertSelectModifier.REPLACE extends InsertT["_modifier"] ? bigint : never);
} : {}));
export declare function execute<InsertT extends ExecutableInsertSelect>(insert: InsertT, connection: IConnection): (Promise<Execute<InsertT>>);
//# sourceMappingURL=execute.d.ts.map