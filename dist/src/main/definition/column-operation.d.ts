import * as d from "../declaration";
export declare function columnToReference<TableNameT extends string, NameT extends string, TypeT>(column: d.IColumn<TableNameT, NameT, TypeT>): d.ColumnToReference<d.IColumn<TableNameT, NameT, TypeT>>;
export declare function nullableColumnNames<RawColumnCollectionT extends d.RawColumnCollection>(columns: d.ColumnCollection<any, RawColumnCollectionT>): d.NullableColumnNames<RawColumnCollectionT>[];
