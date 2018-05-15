import * as d from "../declaration";
export declare function isJoinableSelectTupleElement<ColumnReferencesT extends d.ColumnReferences>(columnReferences: ColumnReferencesT, mixed: any): mixed is d.JoinableSelectTupleElement<ColumnReferencesT>;
export declare function isJoinableSelectTuple<ColumnReferencesT extends d.ColumnReferences>(columnReferences: ColumnReferencesT, mixed: any): mixed is d.Tuple<d.JoinableSelectTupleElement<ColumnReferencesT>>;
export declare function joinableSelectTupleElementToColumnName(element: d.JoinableSelectTupleElement<any>): string;
export declare function joinableSelectTupleHasDuplicateColumnName(tuple: d.Tuple<d.JoinableSelectTupleElement<any>>): boolean;
export declare function joinableSelectTupleToRawColumnCollection<TupleT extends d.Tuple<d.JoinableSelectTupleElement<any>>>(tuple: TupleT): d.JoinableSelectTupleToRawColumnCollection<TupleT>;
export declare function joinableSelectTupleToColumnCollection<AliasT extends string, TupleT extends d.Tuple<d.JoinableSelectTupleElement<any>>>(alias: AliasT, tuple: TupleT): d.ColumnCollection<AliasT, d.JoinableSelectTupleToRawColumnCollection<TupleT>>;
