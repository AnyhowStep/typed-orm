import {ColumnIdentifierRef} from "../../../column-identifier-ref";
import {FromColumnIdentifierMap} from "./from-column-identifier-map";

export type FromColumnIdentifierRef<RefT extends ColumnIdentifierRef> = (
    RefT extends ColumnIdentifierRef ?
    FromColumnIdentifierMap<RefT[Extract<keyof RefT, string>]> :
    never
);