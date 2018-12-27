import { ITable } from "../../../table";
import { IInsert, InsertRow } from "../../insert";
import { QueryTree, QueryTreeArray } from "../../../query-tree";
export declare function queryTreeRow(insert: IInsert, row: InsertRow<ITable>): QueryTreeArray;
export declare function queryTreeValues(insert: IInsert & {
    _values: InsertRow<ITable>[];
}): QueryTreeArray;
export declare function queryTree(insert: IInsert & {
    _values: InsertRow<ITable>[];
}): QueryTree;
//# sourceMappingURL=query-tree.d.ts.map