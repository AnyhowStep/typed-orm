import { InsertSelectRowDelegate, InsertSelect, InsertSelectRow } from "../../../../insert-select";
import { AfterSelectClause } from "../../predicate";
import { ITable } from "../../../../table";
export declare type InsertInto<QueryT extends AfterSelectClause, TableT extends ITable & {
    insertAllowed: true;
}> = (InsertSelect<{
    _query: QueryT;
    _table: TableT;
    _row: InsertSelectRow<QueryT, TableT>;
    _modifier: undefined;
}>);
export declare function insertInto<QueryT extends AfterSelectClause, TableT extends ITable & {
    insertAllowed: true;
}>(query: QueryT, table: TableT, delegate: InsertSelectRowDelegate<QueryT, TableT>): (InsertInto<QueryT, TableT>);
//# sourceMappingURL=insert-into.d.ts.map