import { ColumnMap } from "../column-map";
import { QueryTreeArray } from "../../query-tree";
export declare type FindWithColumnName<ColumnMapT extends ColumnMap, ColumnNameT extends string> = (ColumnMapT extends ColumnMap ? (ColumnNameT extends keyof ColumnMapT ? ColumnMapT[ColumnNameT] : never) : never);
export declare function queryTree(columnMap: ColumnMap): QueryTreeArray;
//# sourceMappingURL=query.d.ts.map