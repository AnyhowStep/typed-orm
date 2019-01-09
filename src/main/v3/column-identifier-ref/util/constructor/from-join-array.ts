import {IJoin} from "../../../join";
import {ColumnIdentifierRef} from "../../column-identifier-ref";
import {Writable} from  "../../../type";
import {FromSelectItemArray_ColumnMapElement} from "./from-select-item-array";
import {appendColumnMap} from "./from-column-map";

export type FromJoinArray<ArrT extends IJoin[]> = (
    ArrT[number] extends never ?
    {} :
    FromSelectItemArray_ColumnMapElement<
        ArrT[number]["columns"]
    >
);
export function appendJoin(
    ref : Writable<ColumnIdentifierRef>,
    join : IJoin
) {
    appendColumnMap(ref, join.columns);
    return ref;
}
export function appendJoinArray(
    ref : Writable<ColumnIdentifierRef>,
    arr : IJoin[]
) {
    for (let join of arr) {
        appendJoin(ref, join);
    }
    return ref;
}
export function fromJoinArray<ArrT extends IJoin[]> (
    arr : ArrT
) : FromJoinArray<ArrT> {
    const result : Writable<ColumnIdentifierRef> = {};
    appendJoinArray(result, arr);
    return result as FromJoinArray<ArrT>;
}
