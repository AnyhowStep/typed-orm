import { ISelectBuilder, AnySelectBuilder } from "./select-builder";
import { Tuple, TupleKeys, TupleLength } from "./tuple";
import { ColumnReferences } from "./column-references";
import { IColumnExpr } from "./expr";
import { ToPartialColumnReferences, ColumnOfReferences, ReplaceColumnOfReference } from "./column-references-operation";
import { IColumn, AnyColumn } from "./column";
import { HasDuplicateColumn, ColumnToReference } from "./column-operation";
import { Join } from "./join";
export declare type SelectTupleElement<ColumnReferencesT extends ColumnReferences> = ((IColumnExpr<ToPartialColumnReferences<ColumnReferencesT>, "__expr", any, any>) | ColumnReferencesT[keyof ColumnReferencesT] | ColumnOfReferences<ColumnReferencesT>);
export declare type AnySelectTupleElement = SelectTupleElement<any>;
export declare type SelectCallback<SelectBuilderT extends AnySelectBuilder> = (SelectBuilderT extends ISelectBuilder<infer DataT> ? (columnReferences: DataT["columnReferences"], selectBuilder: SelectBuilderT) => (Tuple<SelectTupleElement<DataT["columnReferences"]>>) : never);
export declare type SelectTupleElementToColumn<ElementT extends AnySelectTupleElement> = (ElementT extends IColumnExpr<any, infer TableNameT, infer NameT, any> ? IColumn<TableNameT, NameT, any> : ElementT extends IColumn<infer TableNameT, infer NameT, any> ? IColumn<TableNameT, NameT, any> : ElementT extends {
    [name: string]: AnyColumn;
} ? {
    [name in keyof ElementT]: (ElementT[name] extends IColumn<infer TableNameT, infer NameT, any> ? IColumn<TableNameT, NameT, any> : never);
}[keyof ElementT] : never);
export declare type SelectTupleHasDuplicateColumn<TupleT extends Tuple<AnySelectTupleElement>> = (HasDuplicateColumn<{
    [index in TupleKeys<TupleT>]: SelectTupleElementToColumn<TupleT[index]>;
} & {
    length: TupleLength<TupleT>;
} & (AnyColumn)[] & {
    "0": SelectTupleElementToColumn<TupleT[0]>;
}>);
export declare type SelectTupleElementToReferences<ElementT extends AnySelectTupleElement> = (ElementT extends IColumnExpr<any, infer TableNameT, infer NameT, infer TypeT> ? ColumnToReference<IColumn<TableNameT, NameT, TypeT>> : ElementT extends AnyColumn ? ColumnToReference<ElementT> : ElementT extends {
    [name: string]: AnyColumn;
} ? (ElementT[keyof ElementT] extends IColumn<infer TableNameT, any, any> ? {
    [k in TableNameT]: ElementT;
} : {}) : {});
export declare type SelectTupleToReferencesInner<TupleT extends Tuple<AnySelectTupleElement>, K extends string> = (TupleT extends {
    [k in K]: infer ElementT;
} ? SelectTupleElementToReferences<ElementT> : {});
export declare type SelectTupleToReferences<TupleT extends Tuple<AnySelectTupleElement>> = (SelectTupleToReferencesInner<TupleT, "0"> & SelectTupleToReferencesInner<TupleT, "1"> & SelectTupleToReferencesInner<TupleT, "2"> & SelectTupleToReferencesInner<TupleT, "3"> & SelectTupleToReferencesInner<TupleT, "4"> & SelectTupleToReferencesInner<TupleT, "5"> & SelectTupleToReferencesInner<TupleT, "6"> & SelectTupleToReferencesInner<TupleT, "7"> & SelectTupleToReferencesInner<TupleT, "8"> & SelectTupleToReferencesInner<TupleT, "9"> & SelectTupleToReferencesInner<TupleT, "10"> & SelectTupleToReferencesInner<TupleT, "11"> & SelectTupleToReferencesInner<TupleT, "12"> & SelectTupleToReferencesInner<TupleT, "13"> & SelectTupleToReferencesInner<TupleT, "14"> & SelectTupleToReferencesInner<TupleT, "15"> & SelectTupleToReferencesInner<TupleT, "16"> & SelectTupleToReferencesInner<TupleT, "17"> & SelectTupleToReferencesInner<TupleT, "18"> & SelectTupleToReferencesInner<TupleT, "19"> & SelectTupleToReferencesInner<TupleT, "20"> & SelectTupleToReferencesInner<TupleT, "21"> & SelectTupleToReferencesInner<TupleT, "22"> & SelectTupleToReferencesInner<TupleT, "23"> & SelectTupleToReferencesInner<TupleT, "24"> & SelectTupleToReferencesInner<TupleT, "25"> & SelectTupleToReferencesInner<TupleT, "26"> & SelectTupleToReferencesInner<TupleT, "27"> & SelectTupleToReferencesInner<TupleT, "28"> & SelectTupleToReferencesInner<TupleT, "29"> & SelectTupleToReferencesInner<TupleT, "30"> & SelectTupleToReferencesInner<TupleT, "31"> & SelectTupleToReferencesInner<TupleT, "32"> & SelectTupleToReferencesInner<TupleT, "33"> & SelectTupleToReferencesInner<TupleT, "34"> & SelectTupleToReferencesInner<TupleT, "35"> & SelectTupleToReferencesInner<TupleT, "36"> & SelectTupleToReferencesInner<TupleT, "37"> & SelectTupleToReferencesInner<TupleT, "38"> & SelectTupleToReferencesInner<TupleT, "39"> & SelectTupleToReferencesInner<TupleT, "40"> & SelectTupleToReferencesInner<TupleT, "41"> & SelectTupleToReferencesInner<TupleT, "42"> & SelectTupleToReferencesInner<TupleT, "43"> & SelectTupleToReferencesInner<TupleT, "44"> & SelectTupleToReferencesInner<TupleT, "45"> & SelectTupleToReferencesInner<TupleT, "46"> & SelectTupleToReferencesInner<TupleT, "47"> & SelectTupleToReferencesInner<TupleT, "48"> & SelectTupleToReferencesInner<TupleT, "49"> & SelectTupleToReferencesInner<TupleT, "50">);
export declare type ReplaceColumnOfSelectTupleElement<ElementT extends AnySelectTupleElement, TableNameT extends string, NameT extends string, NewTypeT> = (ElementT extends IColumnExpr<infer UsedReferencesT, TableNameT, NameT, any> ? IColumnExpr<UsedReferencesT, TableNameT, NameT, NewTypeT> : ElementT extends IColumn<TableNameT, NameT, any> ? IColumn<TableNameT, NameT, NewTypeT> : ElementT extends {
    [name: string]: AnyColumn;
} ? ReplaceColumnOfReference<{
    [table in TableNameT]: ElementT;
}, TableNameT, NameT, NewTypeT>[TableNameT] : ElementT);
export declare type ReplaceColumnOfSelectTuple<TupleT extends Tuple<AnySelectTupleElement>, TableNameT extends string, NameT extends string, NewTypeT> = (TupleT[TupleKeys<TupleT>] extends AnySelectTupleElement ? ({
    [k in TupleKeys<TupleT>]: (TupleT[k] extends AnySelectTupleElement ? ReplaceColumnOfSelectTupleElement<TupleT[k], TableNameT, NameT, NewTypeT> : never);
} & {
    length: TupleLength<TupleT>;
} & ReplaceColumnOfSelectTupleElement<TupleT[TupleKeys<TupleT>], TableNameT, NameT, NewTypeT>[] & {
    "0": ReplaceColumnOfSelectTupleElement<TupleT[0], TableNameT, NameT, NewTypeT>;
}) : (never));
export declare type JoinTupleToSelectTuple<JoinTupleT extends Tuple<Join<any, any, any>>> = (JoinTupleT[TupleKeys<JoinTupleT>] extends Join<any, any, any> ? ({
    [index in TupleKeys<JoinTupleT>]: (JoinTupleT[index] extends Join<any, any, any> ? JoinTupleT[index]["table"]["columns"] : never);
} & {
    "0": JoinTupleT[0]["table"]["columns"];
} & {
    length: TupleLength<JoinTupleT>;
} & (JoinTupleT[TupleKeys<JoinTupleT>]["table"]["columns"])[]) : (never));
