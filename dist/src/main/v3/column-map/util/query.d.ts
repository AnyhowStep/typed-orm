import { ColumnMap } from "../column-map";
import { IColumn } from "../../column";
export declare type FindWithColumnName<ColumnMapT extends ColumnMap, ColumnNameT extends string> = (ColumnMapT extends ColumnMap ? (ColumnNameT extends keyof ColumnMapT ? ColumnMapT[ColumnNameT] : never) : never);
export declare function getSortedColumnArray(columnMap: ColumnMap): IColumn[];
export declare type TableAlias<ColumnMapT extends ColumnMap> = (ColumnMapT extends ColumnMap ? ColumnMapT[Extract<keyof ColumnMapT, string>]["tableAlias"] : never);
export declare type FindWithTableAlias<ColumnMapT extends ColumnMap, TableAliasT extends string> = (ColumnMapT extends ColumnMap ? Extract<ColumnMapT[Extract<keyof ColumnMapT, string>], {
    tableAlias: TableAliasT;
}> : never);
//# sourceMappingURL=query.d.ts.map