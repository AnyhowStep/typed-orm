import { ColumnMap } from "../../column-map";
export declare type TableAlias<ColumnMapT extends ColumnMap> = (ColumnMapT extends ColumnMap ? ColumnMapT[Extract<keyof ColumnMapT, string>]["tableAlias"] : never);
//# sourceMappingURL=table-alias.d.ts.map