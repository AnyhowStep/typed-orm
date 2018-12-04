import { ColumnMap } from "../column-map";
export declare type FindWithColumnName<ColumnMapT extends ColumnMap, ColumnNameT extends string> = (ColumnMapT extends ColumnMap ? (ColumnNameT extends keyof ColumnMapT ? ColumnMapT[ColumnNameT] : never) : never);
//# sourceMappingURL=query.d.ts.map