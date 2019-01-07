import { ColumnRef } from "../../../column-ref";
import { FromColumnMap } from "./from-column-map";
export declare type FromColumnRef<ColumnRefT extends ColumnRef> = (ColumnRefT extends ColumnRef ? FromColumnMap<ColumnRefT[Extract<keyof ColumnRefT, string>]> : never);
//# sourceMappingURL=from-column-ref.d.ts.map