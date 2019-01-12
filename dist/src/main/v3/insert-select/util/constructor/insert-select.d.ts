import { InsertSelectRowDelegate, InsertSelect, InsertSelectRow, InsertSelectModifier } from "../../insert-select";
import { QueryUtil } from "../../../query";
import { InsertableTable } from "../../../table";
export declare function insertSelect<QueryT extends QueryUtil.AfterSelectClause, TableT extends InsertableTable, ModifierT extends InsertSelectModifier | undefined>(query: QueryT, modifier: ModifierT, table: TableT, delegate: InsertSelectRowDelegate<QueryT, TableT>): (InsertSelect<{
    _query: QueryT;
    _table: TableT;
    _row: InsertSelectRow<QueryT, TableT>;
    _modifier: ModifierT;
}>);
//# sourceMappingURL=insert-select.d.ts.map