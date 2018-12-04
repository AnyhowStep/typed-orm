import { IColumn } from "./column";
import { ColumnMap } from "../column-map";
import { ColumnRef } from "../column-ref";
export declare function queryTree({ tableAlias, name, __subTableName, __isInSelectClause, }: IColumn): string;
export declare type NameUnionFromColumnMap<ColumnMapT extends ColumnMap> = (ColumnMapT extends ColumnMap ? Extract<keyof ColumnMapT, string> : never);
export declare function nameArrayFromColumnMap<ColumnMapT extends ColumnMap>(columnMap: ColumnMapT): NameUnionFromColumnMap<ColumnMapT>[];
export declare type NameUnionFromColumnRef<ColumnRefT extends ColumnRef> = (ColumnRefT extends ColumnRef ? NameUnionFromColumnMap<ColumnRefT[string]> : never);
export declare function nameArrayFromColumnRef<ColumnRefT extends ColumnRef>(columnRef: ColumnRefT): NameUnionFromColumnRef<ColumnRefT>[];
export declare type NullableNameUnionFromColumnMap<ColumnMapT extends ColumnMap> = (ColumnMapT extends ColumnMap ? {
    [columnName in Extract<keyof ColumnMapT, string>]: (null extends ReturnType<ColumnMapT[columnName]["assertDelegate"]> ? columnName : never);
}[Extract<keyof ColumnMapT, string>] : never);
export declare function nullableNameArrayFromColumnMap<ColumnMapT extends ColumnMap>(columnMap: ColumnMapT): NullableNameUnionFromColumnMap<ColumnMapT>[];
//# sourceMappingURL=query.d.ts.map