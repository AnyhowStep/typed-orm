import { ColumnIdentifierUtil } from "../../../column-identifier";
import { ColumnIdentifierRef } from "../../column-identifier-ref";
import { Writable } from "../../../type";
import { ColumnRef } from "../../../column-ref";
export declare type FromColumnRef<ColumnRefT extends ColumnRef> = (ColumnRefT extends ColumnRef ? {
    readonly [tableAlias in Extract<keyof ColumnRefT, string>]: ({
        readonly [columnName in Extract<keyof ColumnRefT[tableAlias], string>]: (ColumnIdentifierUtil.FromColumn<ColumnRefT[tableAlias][columnName]>);
    });
} : never);
export declare function appendColumnRef(ref: Writable<ColumnIdentifierRef>, columnRef: ColumnRef): Writable<ColumnIdentifierRef>;
export declare function fromColumnRef<ColumnRefT extends ColumnRef>(columnRef: ColumnRefT): FromColumnRef<ColumnRefT>;
//# sourceMappingURL=from-column-ref.d.ts.map