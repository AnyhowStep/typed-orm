import { ColumnIdentifierRef } from "../column-identifier-ref";
export declare type HasOneTable<ColumnRefT extends ColumnIdentifierRef> = (Extract<keyof ColumnRefT, string> extends never ? false : string extends Extract<keyof ColumnRefT, string> ? boolean : ({
    [tableAlias in Extract<keyof ColumnRefT, string>]: (Exclude<Extract<keyof ColumnRefT, string>, tableAlias>);
}[Extract<keyof ColumnRefT, string>]) extends never ? true : false);
export declare function hasOneTable<ColumnRefT extends ColumnIdentifierRef>(columnRef: ColumnRefT): HasOneTable<ColumnRefT>;
export declare type ToConvenient<ColumnRefT extends ColumnIdentifierRef> = (HasOneTable<ColumnRefT> extends true ? ColumnRefT[Extract<keyof ColumnRefT, string>] : ColumnRefT);
export declare function toConvenient<ColumnRefT extends ColumnIdentifierRef>(columnRef: ColumnRefT): ToConvenient<ColumnRefT>;
//# sourceMappingURL=operation.d.ts.map