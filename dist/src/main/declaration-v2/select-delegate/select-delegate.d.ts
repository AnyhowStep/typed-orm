import { AnySelectBuilder } from "../select-builder";
import { JoinCollectionUtil } from "../join-collection";
import { Tuple } from "../tuple";
import { Select } from "../select";
import { ColumnReferencesUtil } from "../column-references";
export declare type SelectDelegateColumnReferences<SelectBuilderT extends AnySelectBuilder> = ((SelectBuilderT["data"]["hasFrom"] extends true ? JoinCollectionUtil.ToColumnReferences<SelectBuilderT["data"]["joins"]> : {}) & (SelectBuilderT["data"]["hasParentJoins"] extends true ? JoinCollectionUtil.ToColumnReferences<SelectBuilderT["data"]["parentJoins"]> : {}));
export declare type SelectDelegate<SelectBuilderT extends AnySelectBuilder> = ((columnReferences: ColumnReferencesUtil.ToConvenient<SelectDelegateColumnReferences<SelectBuilderT>>, selectBuilder: SelectBuilderT) => (Tuple<Select<SelectDelegateColumnReferences<SelectBuilderT>>>));
