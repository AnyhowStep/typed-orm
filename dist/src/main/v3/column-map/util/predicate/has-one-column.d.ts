import { ColumnMap } from "../../column-map";
export declare type HasOneColumn<ColumnMapT extends ColumnMap> = (Extract<keyof ColumnMapT, string> extends never ? false : string extends Extract<keyof ColumnMapT, string> ? boolean : ({
    [columnName in Extract<keyof ColumnMapT, string>]: (Exclude<Extract<keyof ColumnMapT, string>, columnName>);
}[Extract<keyof ColumnMapT, string>]) extends never ? true : false);
export declare function hasOneColumn<ColumnMapT extends ColumnMap>(columnMap: ColumnMapT): HasOneColumn<ColumnMapT>;
//# sourceMappingURL=has-one-column.d.ts.map