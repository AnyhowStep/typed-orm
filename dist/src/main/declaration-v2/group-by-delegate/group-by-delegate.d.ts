import { AnySelectBuilder } from "../select-builder";
import { JoinCollectionUtil } from "../join-collection";
import { ColumnReferencesUtil } from "../column-references";
import { SelectCollectionUtil } from '../select-collection';
import { GroupBy } from "../group-by";
import { Tuple } from "../tuple";
export declare type GroupByDelegate<SelectBuilderT extends AnySelectBuilder> = ((columnReferences: (ColumnReferencesUtil.ToConvenient<ColumnReferencesUtil.Merge<JoinCollectionUtil.ToColumnReferences<SelectBuilderT["data"]["joins"]>, SelectCollectionUtil.ToColumnReferences<SelectBuilderT["data"]["selects"]>>>), selectBuilder: SelectBuilderT) => (Tuple<GroupBy<ColumnReferencesUtil.Merge<JoinCollectionUtil.ToColumnReferences<SelectBuilderT["data"]["joins"]>, SelectCollectionUtil.ToColumnReferences<SelectBuilderT["data"]["selects"]>>>>));
//# sourceMappingURL=group-by-delegate.d.ts.map