import { SelectCollection, SelectCollectionUtil } from "../select-collection";
import { ColumnReferencesUtil } from "../column-references";
export declare type TypeWidenDelegate<SelectsT extends SelectCollection | undefined> = (SelectsT extends SelectCollection ? (selectReferences: ColumnReferencesUtil.ToConvenient<SelectCollectionUtil.ToColumnReferences<SelectsT>>) => (SelectCollectionUtil.Columns<SelectsT>) : never);
//# sourceMappingURL=type-widen-delegate.d.ts.map