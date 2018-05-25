import { AnySelectBuilder } from "../select-builder";
import { JoinCollectionUtil } from "../join-collection";
import { Expr } from "../expr";
import { ColumnReferencesUtil } from "../column-references";
export declare type WhereDelegateColumnReferences<SelectBuilderT extends AnySelectBuilder> = ((SelectBuilderT["data"]["hasFrom"] extends true ? JoinCollectionUtil.ToColumnReferences<SelectBuilderT["data"]["joins"]> : {}) & (SelectBuilderT["data"]["hasParentJoins"] extends true ? JoinCollectionUtil.ToColumnReferences<SelectBuilderT["data"]["parentJoins"]> : {}));
export declare type WhereDelegate<SelectBuilderT extends AnySelectBuilder> = ((columnReferences: ColumnReferencesUtil.ToConvenient<WhereDelegateColumnReferences<SelectBuilderT>>, selectBuilder: SelectBuilderT) => (Expr<ColumnReferencesUtil.Partial<WhereDelegateColumnReferences<SelectBuilderT>>, boolean>));
