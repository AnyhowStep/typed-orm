import { AnySelectBuilder, ISelectBuilder } from "./select-builder";
import { ColumnOfReferences } from "./column-references-operation";
export declare type TypeNarrowCallback<FromBuilderT extends AnySelectBuilder> = (FromBuilderT extends ISelectBuilder<infer DataT> ? (columnReferences: DataT["columnReferences"]) => ColumnOfReferences<DataT["columnReferences"]> : never);
