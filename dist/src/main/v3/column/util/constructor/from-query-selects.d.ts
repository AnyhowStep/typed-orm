import { IQuery } from "../../../query";
import { SelectItem } from "../../../select-item";
import { FromSelectItemArray } from "./from-select-item-array";
export declare type FromQuerySelects<QueryT extends IQuery> = (QueryT["_selects"] extends SelectItem[] ? FromSelectItemArray<QueryT["_selects"]> : never);
