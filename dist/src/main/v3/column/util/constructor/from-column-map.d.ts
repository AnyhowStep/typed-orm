import { ColumnMap } from "../../../column-map";
export declare type FromColumnMap<ColumnMapT extends ColumnMap> = (ColumnMapT extends ColumnMap ? ColumnMapT[Extract<keyof ColumnMapT, string>] : never);
//# sourceMappingURL=from-column-map.d.ts.map