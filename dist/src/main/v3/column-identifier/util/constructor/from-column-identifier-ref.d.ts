import { ColumnIdentifierRef } from "../../../column-identifier-ref";
import { FromColumnIdentifierMap } from "./from-column-identifier-map";
export declare type FromColumnIdentifierRef<RefT extends ColumnIdentifierRef> = (RefT extends ColumnIdentifierRef ? FromColumnIdentifierMap<RefT[Extract<keyof RefT, string>]> : never);
//# sourceMappingURL=from-column-identifier-ref.d.ts.map