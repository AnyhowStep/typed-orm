import { ColumnOfReferences } from "./column-references-operation";
import { ColumnReferences } from "./column-references";
export declare type TypeNarrowCallback<ColumnReferencesT extends ColumnReferences> = ((columnReferences: ColumnReferencesT) => ColumnOfReferences<ColumnReferencesT>);
