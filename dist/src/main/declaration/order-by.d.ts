import { ISelectBuilder, AnySelectBuilder } from "./select-builder";
import { Tuple } from "./tuple";
import { ColumnReferences } from "./column-references";
import { ToPartialColumnReferences, ColumnOfReferences } from "./column-references-operation";
import { IExpr } from "./expr";
export declare type OrderByFirstComponent<ColumnReferencesT extends ColumnReferences> = ((IExpr<ToPartialColumnReferences<ColumnReferencesT>, any>) | ColumnOfReferences<ColumnReferencesT>);
export declare type OrderByTupleElement<ColumnReferencesT extends ColumnReferences> = (OrderByFirstComponent<ColumnReferencesT> | [OrderByFirstComponent<ColumnReferencesT>, boolean]);
export declare type AnyOrderByTupleElement = OrderByTupleElement<any>;
export declare type OrderByCallback<SelectBuilderT extends AnySelectBuilder> = (SelectBuilderT extends ISelectBuilder<infer DataT> ? (columnReferences: (DataT["columnReferences"] & DataT["selectReferences"]), selectBuilder: SelectBuilderT) => (Tuple<OrderByTupleElement<DataT["columnReferences"] & DataT["selectReferences"]>>) : never);
