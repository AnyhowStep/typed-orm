import { AnySelectBuilder } from "../select-builder";
import { JoinCollectionUtil } from "../join-collection";
import { Expr } from "../expr";
import { ColumnReferencesUtil } from "../column-references";
import { SelectCollectionUtil } from '../select-collection';
export declare type HavingDelegate<SelectBuilderT extends AnySelectBuilder> = ((columnReferences: (ColumnReferencesUtil.ToConvenient<ColumnReferencesUtil.Merge<JoinCollectionUtil.ToColumnReferences<SelectBuilderT["data"]["joins"]>, SelectCollectionUtil.ToColumnReferences<SelectBuilderT["data"]["selects"]>>>), selectBuilder: SelectBuilderT) => (Expr<ColumnReferencesUtil.Partial<ColumnReferencesUtil.Merge<JoinCollectionUtil.ToColumnReferences<SelectBuilderT["data"]["joins"]>, SelectCollectionUtil.ToColumnReferences<SelectBuilderT["data"]["selects"]>>>, boolean>));
//# sourceMappingURL=having-delegate.d.ts.map