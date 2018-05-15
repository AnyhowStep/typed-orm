import { ISelectBuilder, AnySelectBuilder } from "./select-builder";
import { Tuple } from "./tuple";
import { ColumnReferences } from "./column-references";
import { ColumnOfReferences } from "./column-references-operation";
export declare type GroupByTupleElement<ColumnReferencesT extends ColumnReferences> = (ColumnReferencesT[keyof ColumnReferencesT] | ColumnOfReferences<ColumnReferencesT>);
export declare type AnyGroupByTupleElement = GroupByTupleElement<any>;
export declare type GroupByCallback<SelectBuilderT extends AnySelectBuilder> = (SelectBuilderT extends ISelectBuilder<infer DataT> ? (columnReferences: DataT["columnReferences"] & DataT["selectReferences"], selectBuilder: SelectBuilderT) => (Tuple<GroupByTupleElement<DataT["columnReferences"] & DataT["selectReferences"]>>) : never);
