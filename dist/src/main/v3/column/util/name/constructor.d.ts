import { ColumnMap } from "../../../column-map";
import { ColumnRef } from "../../../column-ref";
export declare type FromColumnMap<ColumnMapT extends ColumnMap> = (ColumnMapT extends ColumnMap ? Extract<keyof ColumnMapT, string> : never);
export declare type FromColumnRef<ColumnRefT extends ColumnRef> = (ColumnRefT extends ColumnRef ? FromColumnMap<ColumnRefT[Extract<keyof ColumnRefT, string>]> : never);
export declare type NullableFromColumnMap<ColumnMapT extends ColumnMap> = (ColumnMapT extends ColumnMap ? {
    [columnName in Extract<keyof ColumnMapT, string>]: (null extends ReturnType<ColumnMapT[columnName]["assertDelegate"]> ? columnName : never);
}[Extract<keyof ColumnMapT, string>] : never);
//# sourceMappingURL=constructor.d.ts.map