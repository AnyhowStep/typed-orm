import { AnySelectBuilder } from "../select-builder";
import { JoinCollectionUtil } from "../join-collection";
import { Expr } from "../expr";
import { ColumnReferencesUtil } from "../column-references";
export declare type WhereDelegate<SelectBuilderT extends AnySelectBuilder> = ((columnReferences: JoinCollectionUtil.ToConvenientColumnReferences<SelectBuilderT["data"]["joins"]>, selectBuilder: SelectBuilderT) => (Expr<ColumnReferencesUtil.Partial<JoinCollectionUtil.ToColumnReferences<SelectBuilderT["data"]["joins"]>>, boolean>));
