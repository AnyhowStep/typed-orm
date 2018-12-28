import { IInsertSelect, InsertSelectRow, InsertSelectModifier } from "../../insert-select";
import { IConnection, InsertResult } from "../../../execution";
import { QueryUtil } from "../../../query";
import { ITable } from "../../../table";
export declare type Execute<InsertT extends (IInsertSelect & {
    _row: InsertSelectRow<QueryUtil.AfterSelectClause, ITable>;
})> = (InsertResult & (InsertT["_table"]["autoIncrement"] extends string ? {
    [k in InsertT["_table"]["autoIncrement"]]: (InsertSelectModifier.IGNORE extends InsertT["_modifier"] ? undefined | bigint : undefined extends InsertT["_modifier"] ? bigint : InsertSelectModifier.REPLACE extends InsertT["_modifier"] ? bigint : never);
} : {}));
export declare function execute<InsertT extends (IInsertSelect & {
    _row: InsertSelectRow<QueryUtil.AfterSelectClause, ITable>;
})>(insert: InsertT, connection: IConnection): (Promise<Execute<InsertT>>);
//# sourceMappingURL=execute.d.ts.map