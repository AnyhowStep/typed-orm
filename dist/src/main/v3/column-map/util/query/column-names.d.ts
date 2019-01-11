import { ColumnMap } from "../../column-map";
export declare type ColumnNames<MapT extends ColumnMap> = (MapT extends ColumnMap ? Extract<keyof MapT, string> : never);
export declare function columnNames<MapT extends ColumnMap>(columnMap: MapT): ColumnNames<MapT>[];
//# sourceMappingURL=column-names.d.ts.map