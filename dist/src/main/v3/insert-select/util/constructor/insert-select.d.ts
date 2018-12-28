import { InsertSelectRowDelegate, InsertSelect, InsertSelectRow, InsertSelectModifier } from "../../insert-select";
import { QueryUtil } from "../../../query";
import { ITable } from "../../../table";
export declare function insertSelect<QueryT extends QueryUtil.AfterSelectClause, TableT extends ITable & {
    insertAllowed: true;
}, ModifierT extends InsertSelectModifier | undefined>(query: QueryT, modifier: ModifierT, table: TableT, delegate: InsertSelectRowDelegate<QueryT, TableT>): (InsertSelect<{
    _query: QueryT;
    _table: TableT;
    _row: InsertSelectRow<QueryT, TableT>;
    _modifier: ModifierT;
}>);
//# sourceMappingURL=insert-select.d.ts.map