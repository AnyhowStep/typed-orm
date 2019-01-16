import { TypeMapUtil } from "../type-map";
import { ColumnMapUtil } from "../column-map";
import { SelectItem } from "../select-item";
export declare type UnmappedFetchMap<SelectsT extends SelectItem[]> = (TypeMapUtil.FromColumnMap<ColumnMapUtil.FromSelectItemArray<SelectsT, "">>);
//# sourceMappingURL=index.d.ts.map