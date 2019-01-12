import { ITable } from "../../../table";
import { IInsert, InsertRow, ExecutableInsert } from "../../insert";
import { QueryTree, QueryTreeArray } from "../../../query-tree";
export declare function queryTreeRow(insert: IInsert, row: InsertRow<ITable>): QueryTreeArray;
export declare function queryTreeValues(insert: ExecutableInsert): QueryTreeArray;
export declare function queryTree(insert: ExecutableInsert): QueryTree;
//# sourceMappingURL=query-tree.d.ts.map