import { ISelectBuilder, AnySelectBuilder } from "./select-builder";
import { IExpr } from "./expr";
import { ToPartialColumnReferences } from "./column-references-operation";
export declare type WhereCallback<SelectBuilderT extends AnySelectBuilder> = (SelectBuilderT extends ISelectBuilder<infer DataT> ? (columnReferences: DataT["columnReferences"], selectBuilder: SelectBuilderT) => (IExpr<ToPartialColumnReferences<DataT["columnReferences"]>, boolean>) : never);
