import { ColumnMap } from "../../column-map";
export declare type NullableColumnNames<MapT extends ColumnMap> = (MapT extends ColumnMap ? {
    [columnName in Extract<keyof MapT, string>]: (null extends ReturnType<MapT[columnName]["assertDelegate"]> ? columnName : never);
}[Extract<keyof MapT, string>] : never);
export declare function nullableColumnNames<MapT extends ColumnMap>(columnMap: MapT): NullableColumnNames<MapT>[];
