import { ColumnIdentifierRef } from "../../column-identifier-ref";
import { HasOneTable } from "../predicate";
export declare type ToConvenient<ColumnRefT extends ColumnIdentifierRef> = (HasOneTable<ColumnRefT> extends true ? ColumnRefT[Extract<keyof ColumnRefT, string>] : ColumnRefT);
export declare function toConvenient<ColumnRefT extends ColumnIdentifierRef>(columnRef: ColumnRefT): ToConvenient<ColumnRefT>;
//# sourceMappingURL=to-convenient.d.ts.map