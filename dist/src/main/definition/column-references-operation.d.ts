import * as d from "../declaration";
import * as sd from "schema-decorator";
import { Column } from "./column";
export declare function toNullableColumnReferences<ColumnReferencesT extends d.ColumnReferences>(columnReferences: ColumnReferencesT): d.ToNullableColumnReferences<ColumnReferencesT>;
export declare function copyReferences<ColumnReferencesT extends d.ColumnReferences | d.ExprUsedColumns<any>>(columnReferences: ColumnReferencesT): ColumnReferencesT;
export declare function replaceColumnOfReference<ColumnReferencesT extends d.ColumnReferences, TableNameT extends string, NameT extends string, NewTypeT>(columnReferences: ColumnReferencesT, newColumn: Column<TableNameT, NameT, NewTypeT>): d.ReplaceColumnOfReference<ColumnReferencesT, TableNameT, NameT, NewTypeT>;
export declare function isPartialColumnReferences<ColumnReferencesT extends d.ColumnReferences>(columnReferences: ColumnReferencesT, mixed: any): mixed is d.ToPartialColumnReferences<ColumnReferencesT>;
export declare function combineReferences<T extends d.ColumnReferences | d.ExprUsedColumns<any>, U extends d.ColumnReferences | d.ExprUsedColumns<any>>(t: T, u: U): T & U;
export declare function columnReferencesToSchemaWithJoins<ColumnReferencesT extends d.ColumnReferences, JoinTupleT extends d.Tuple<d.AnyJoin>>(columnReferences: ColumnReferencesT, joins: JoinTupleT): (sd.AssertDelegate<d.ColumnReferencesToSchemaWithJoins<ColumnReferencesT, JoinTupleT>>);
