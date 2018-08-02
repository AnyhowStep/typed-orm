import { SelectBuilderData } from "../select-builder";
import { SelectUtil } from "../select";
import { SelectCollection } from "../select-collection";
import * as invalid from "../invalid";
export declare type FetchValueType<DataT extends SelectBuilderData> = (DataT["selects"] extends SelectCollection ? SelectUtil.Types<DataT["selects"][0]> : never);
export declare type FetchValueCheck<DataT extends SelectBuilderData, ResultT> = (DataT["selects"] extends SelectCollection ? (DataT["selects"]["length"] extends 1 ? (SelectUtil.HasOneType<DataT["selects"][0]> extends true ? (Promise<ResultT>) : invalid.E2<"Can only fetchValue when selecting one single-type column; found", SelectUtil.Types<DataT["selects"][0]>>) : invalid.E3<"Can only fetchValue() when selecting one column; found", DataT["selects"]["length"], "columns">) : invalid.E2<"Can only fetchValue() after SELECT clause; current SELECTs:", DataT["selects"]>);
//# sourceMappingURL=fetch-value.d.ts.map