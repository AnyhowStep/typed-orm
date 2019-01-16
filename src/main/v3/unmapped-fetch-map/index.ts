import {TypeMapUtil} from "../type-map";
import {ColumnMapUtil} from "../column-map";
import {SelectItem} from "../select-item";

export type UnmappedFetchMap<
    SelectsT extends SelectItem[]
> = (
    TypeMapUtil.FromColumnMap<
        ColumnMapUtil.FromSelectItemArray<SelectsT, "">
    >
);