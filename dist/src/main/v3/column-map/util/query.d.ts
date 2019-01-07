import { ColumnMap } from "../column-map";
import { IColumn } from "../../column";
export declare type FindWithColumnName<ColumnMapT extends ColumnMap, ColumnNameT extends string> = (ColumnMapT extends ColumnMap ? (ColumnNameT extends keyof ColumnMapT ? ColumnMapT[ColumnNameT] : never) : never);
export declare function getSortedColumnArray(columnMap: ColumnMap): IColumn[];
export declare type TableAlias<ColumnMapT extends ColumnMap> = (ColumnMapT extends ColumnMap ? ColumnMapT[Extract<keyof ColumnMapT, string>]["tableAlias"] : never);
export declare type FindWithTableAlias<ColumnMapT extends ColumnMap, TableAliasT extends string> = (ColumnMapT extends ColumnMap ? Extract<ColumnMapT[Extract<keyof ColumnMapT, string>], {
    tableAlias: TableAliasT;
}> : never);
export declare type ColumnNames<MapT extends ColumnMap> = (MapT extends ColumnMap ? Extract<keyof MapT, string> : never);
export declare function columnNames<MapT extends ColumnMap>(columnMap: MapT): ColumnNames<MapT>[];
export declare type NullableColumnNames<MapT extends ColumnMap> = (MapT extends ColumnMap ? {
    [columnName in Extract<keyof MapT, string>]: (null extends ReturnType<MapT[columnName]["assertDelegate"]> ? columnName : never);
}[Extract<keyof MapT, string>] : never);
export declare function nullableColumnNames<MapT extends ColumnMap>(columnMap: MapT): NullableColumnNames<MapT>[];
//# sourceMappingURL=query.d.ts.map