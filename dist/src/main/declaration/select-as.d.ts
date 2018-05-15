import * as sd from "schema-decorator";
import { ColumnReferences } from "./column-references";
import { IColumnExpr } from "./expr";
import { ToPartialColumnReferences, ColumnOfReferences } from "./column-references-operation";
import { IColumn } from "./column";
import { Tuple, TupleKeys, TupleLength } from "./tuple";
import { HasDuplicateColumn } from "./column-operation";
export declare type JoinableSelectTupleElement<ColumnReferencesT extends ColumnReferences> = (IColumnExpr<ToPartialColumnReferences<ColumnReferencesT>, "__expr", any, any> | ColumnOfReferences<ColumnReferencesT>);
export declare type JoinableSelectTupleElementToRawColumn<ElementT extends JoinableSelectTupleElement<any>> = (ElementT extends IColumnExpr<any, any, infer NameT, infer TypeT> ? {
    [name in NameT]: sd.AssertDelegate<TypeT>;
} : ElementT extends IColumn<any, infer NameT, infer TypeT> ? {
    [name in NameT]: sd.AssertDelegate<TypeT>;
} : {});
export declare type JoinableSelectTupleToRawColumn<TupleT extends Tuple<JoinableSelectTupleElement<any>>, K extends string> = (TupleT extends {
    [k in K]: infer ElementT;
} ? JoinableSelectTupleElementToRawColumn<ElementT> : {});
export declare type JoinableSelectTupleToRawColumnCollection<TupleT extends Tuple<JoinableSelectTupleElement<any>>> = (JoinableSelectTupleToRawColumn<TupleT, "0"> & JoinableSelectTupleToRawColumn<TupleT, "1"> & JoinableSelectTupleToRawColumn<TupleT, "2"> & JoinableSelectTupleToRawColumn<TupleT, "3"> & JoinableSelectTupleToRawColumn<TupleT, "4"> & JoinableSelectTupleToRawColumn<TupleT, "5"> & JoinableSelectTupleToRawColumn<TupleT, "6"> & JoinableSelectTupleToRawColumn<TupleT, "7"> & JoinableSelectTupleToRawColumn<TupleT, "8"> & JoinableSelectTupleToRawColumn<TupleT, "9"> & JoinableSelectTupleToRawColumn<TupleT, "10"> & JoinableSelectTupleToRawColumn<TupleT, "11"> & JoinableSelectTupleToRawColumn<TupleT, "12"> & JoinableSelectTupleToRawColumn<TupleT, "13"> & JoinableSelectTupleToRawColumn<TupleT, "14"> & JoinableSelectTupleToRawColumn<TupleT, "15"> & JoinableSelectTupleToRawColumn<TupleT, "16"> & JoinableSelectTupleToRawColumn<TupleT, "17"> & JoinableSelectTupleToRawColumn<TupleT, "18"> & JoinableSelectTupleToRawColumn<TupleT, "19"> & JoinableSelectTupleToRawColumn<TupleT, "20"> & JoinableSelectTupleToRawColumn<TupleT, "21"> & JoinableSelectTupleToRawColumn<TupleT, "22"> & JoinableSelectTupleToRawColumn<TupleT, "23"> & JoinableSelectTupleToRawColumn<TupleT, "24"> & JoinableSelectTupleToRawColumn<TupleT, "25"> & JoinableSelectTupleToRawColumn<TupleT, "26"> & JoinableSelectTupleToRawColumn<TupleT, "27"> & JoinableSelectTupleToRawColumn<TupleT, "28"> & JoinableSelectTupleToRawColumn<TupleT, "29"> & JoinableSelectTupleToRawColumn<TupleT, "30"> & JoinableSelectTupleToRawColumn<TupleT, "31"> & JoinableSelectTupleToRawColumn<TupleT, "32"> & JoinableSelectTupleToRawColumn<TupleT, "33"> & JoinableSelectTupleToRawColumn<TupleT, "34"> & JoinableSelectTupleToRawColumn<TupleT, "35"> & JoinableSelectTupleToRawColumn<TupleT, "36"> & JoinableSelectTupleToRawColumn<TupleT, "37"> & JoinableSelectTupleToRawColumn<TupleT, "38"> & JoinableSelectTupleToRawColumn<TupleT, "39"> & JoinableSelectTupleToRawColumn<TupleT, "40"> & JoinableSelectTupleToRawColumn<TupleT, "41"> & JoinableSelectTupleToRawColumn<TupleT, "42"> & JoinableSelectTupleToRawColumn<TupleT, "43"> & JoinableSelectTupleToRawColumn<TupleT, "44"> & JoinableSelectTupleToRawColumn<TupleT, "45"> & JoinableSelectTupleToRawColumn<TupleT, "46"> & JoinableSelectTupleToRawColumn<TupleT, "47"> & JoinableSelectTupleToRawColumn<TupleT, "48"> & JoinableSelectTupleToRawColumn<TupleT, "49"> & JoinableSelectTupleToRawColumn<TupleT, "50">);
export declare type JoinableSelectTupleElementToColumnName<ElementT extends JoinableSelectTupleElement<any>> = (ElementT extends IColumnExpr<any, any, infer NameT, any> ? IColumn<"dummy", NameT, any> : ElementT extends IColumn<any, infer NameT, any> ? IColumn<"dummy", NameT, any> : never);
export declare type JoinableSelectTupleHasDuplicateColumnName<TupleT extends Tuple<JoinableSelectTupleElement<any>>> = (HasDuplicateColumn<{
    [index in TupleKeys<TupleT>]: JoinableSelectTupleElementToColumnName<TupleT[index]>;
} & {
    length: TupleLength<TupleT>;
} & (JoinableSelectTupleElementToColumnName<TupleT[TupleKeys<TupleT>]>)[] & {
    "0": JoinableSelectTupleElementToColumnName<TupleT[0]>;
}>);
