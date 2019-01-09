import { ColumnIdentifierRef } from "../../column-identifier-ref";
export declare type HasOneTable<ColumnRefT extends ColumnIdentifierRef> = (Extract<keyof ColumnRefT, string> extends never ? false : string extends Extract<keyof ColumnRefT, string> ? boolean : ({
    [tableAlias in Extract<keyof ColumnRefT, string>]: (Exclude<Extract<keyof ColumnRefT, string>, tableAlias>);
}[Extract<keyof ColumnRefT, string>]) extends never ? true : false);
export declare function hasOneTable<ColumnRefT extends ColumnIdentifierRef>(columnRef: ColumnRefT): HasOneTable<ColumnRefT>;
//# sourceMappingURL=has-one-table.d.ts.map