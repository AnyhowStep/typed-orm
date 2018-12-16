import {ColumnIdentifierRef} from "../../../column-identifier-ref";
import {ColumnIdentifierMap} from "../../../column-identifier-map";

//Technically, this could be wrong.
//But it shouldn't be wrong, in general.
export type FromColumnIdentifierMap<ColumnMapT extends ColumnIdentifierMap> = (
    ColumnMapT extends ColumnIdentifierMap ?
    Extract<keyof ColumnMapT, string> :
    never
);
//Technically, this could be wrong.
//But it shouldn't be wrong, in general.
export type FromColumnIdentifierRef<ColumnRefT extends ColumnIdentifierRef> = (
    ColumnRefT extends ColumnIdentifierRef ?
    FromColumnIdentifierMap<ColumnRefT[string]> :
    never
);