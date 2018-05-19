import { ColumnOfReferences } from "./column-references-operation";
import { ColumnReferences } from "./column-references";
export declare type TypeWidenCallback<ColumnReferencesT extends ColumnReferences> = ((selectReferences: ColumnReferencesT) => (ColumnOfReferences<ColumnReferencesT>));
