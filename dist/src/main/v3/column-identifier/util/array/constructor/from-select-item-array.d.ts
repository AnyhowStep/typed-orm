import { SelectItem } from "../../../../select-item";
import { FromSelectItem } from "./from-select-item";
export declare type FromSelectItemArray<ArrT extends SelectItem[]> = (FromSelectItem<ArrT[number]>);
export declare function fromSelectItemArray<ArrT extends SelectItem[]>(arr: ArrT): FromSelectItemArray<ArrT>;
