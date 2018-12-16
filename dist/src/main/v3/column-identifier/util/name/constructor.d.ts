import { ColumnIdentifierRef } from "../../../column-identifier-ref";
import { ColumnIdentifierMap } from "../../../column-identifier-map";
export declare type FromColumnIdentifierMap<ColumnMapT extends ColumnIdentifierMap> = (ColumnMapT extends ColumnIdentifierMap ? Extract<keyof ColumnMapT, string> : never);
export declare type FromColumnIdentifierRef<ColumnRefT extends ColumnIdentifierRef> = (ColumnRefT extends ColumnIdentifierRef ? FromColumnIdentifierMap<ColumnRefT[string]> : never);
//# sourceMappingURL=constructor.d.ts.map