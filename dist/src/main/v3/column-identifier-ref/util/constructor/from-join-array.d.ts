import { IJoin } from "../../../join";
import { ColumnIdentifierRef } from "../../column-identifier-ref";
import { Writable } from "../../../type";
import { FromSelectItemArray_ColumnMapElement } from "./from-select-item-array";
export declare type FromJoinArray<ArrT extends IJoin[]> = (ArrT[number] extends never ? {} : FromSelectItemArray_ColumnMapElement<ArrT[number]["columns"]>);
export declare function appendJoin(ref: Writable<ColumnIdentifierRef>, join: IJoin): Writable<ColumnIdentifierRef>;
export declare function appendJoinArray(ref: Writable<ColumnIdentifierRef>, arr: IJoin[]): Writable<ColumnIdentifierRef>;
export declare function fromJoinArray<ArrT extends IJoin[]>(arr: ArrT): FromJoinArray<ArrT>;
//# sourceMappingURL=from-join-array.d.ts.map