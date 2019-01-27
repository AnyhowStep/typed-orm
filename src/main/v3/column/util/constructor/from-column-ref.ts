import {ColumnRef} from "../../../column-ref";
import {FromColumnMap} from "./from-column-map";
import {ColumnMap} from "../../../column-map";

export type FromColumnRef<ColumnRefT extends ColumnRef> = (
    ColumnRefT extends ColumnRef ?
    (
        //Unfortunately, {} & ColumnMap extends ColumnRef
        ColumnRefT[keyof ColumnRefT] extends ColumnMap ?
        FromColumnMap<ColumnRefT[keyof ColumnRefT]> :
        never
    ) :
    never
);