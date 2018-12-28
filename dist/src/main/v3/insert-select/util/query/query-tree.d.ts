import { ITable } from "../../../table";
import { IInsertSelect, InsertSelectRow } from "../../insert-select";
import { QueryTree } from "../../../query-tree";
import { QueryUtil } from "../../../query";
export declare function queryTree(insert: (IInsertSelect & {
    _row: InsertSelectRow<QueryUtil.AfterSelectClause, ITable>;
})): QueryTree;
//# sourceMappingURL=query-tree.d.ts.map