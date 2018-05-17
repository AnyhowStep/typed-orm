import {ISelectBuilder, AnySelectBuilder} from "./select-builder";
import {Tuple, TupleKeys, TupleLength} from "./tuple";
import {ColumnReferences} from "./column-references";
import {IColumnExpr} from "./expr";
import {
    ToPartialColumnReferences,
    ColumnOfReferences,
    ReplaceColumnOfReference
} from "./column-references-operation";
import {IColumn, AnyColumn} from "./column";
import {HasDuplicateColumn, ColumnToReference} from "./column-operation";
import {AnyJoin} from "./join";

export type SelectTupleElement<ColumnReferencesT extends ColumnReferences> = (
    (IColumnExpr<
        ToPartialColumnReferences<ColumnReferencesT>,
        "__expr",
        any,
        any
    >)|
    ColumnReferencesT[keyof ColumnReferencesT]|
    ColumnOfReferences<ColumnReferencesT>
);
export type AnySelectTupleElement = SelectTupleElement<any>;

export type SelectCallback<
    SelectBuilderT extends AnySelectBuilder
> = (
    SelectBuilderT extends ISelectBuilder<infer DataT> ?
        (
            columnReferences : DataT["columnReferences"],
            selectBuilder : SelectBuilderT
        ) => (
            Tuple<
                SelectTupleElement<DataT["columnReferences"]>
            >
        ):
        never
);

//Checking for duplicate columns should only care about the table name and name
//TODO check this works
export type SelectTupleElementToColumn<ElementT extends AnySelectTupleElement> = (
    ElementT extends IColumnExpr<any, infer TableNameT, infer NameT, any> ?
    IColumn<TableNameT, NameT, any> :
    ElementT extends IColumn<infer TableNameT, infer NameT, any> ?
    IColumn<TableNameT, NameT, any> :
    ElementT extends {
        [name : string] : AnyColumn
    } ?
    {
        [name in keyof ElementT] : (
            ElementT[name] extends IColumn<infer TableNameT, infer NameT, any> ?
                IColumn<TableNameT, NameT, any> :
                never
        )
    }[keyof ElementT] :
    never
);
export type SelectTupleHasDuplicateColumn<TupleT extends Tuple<AnySelectTupleElement>> = (
    HasDuplicateColumn<
        {
            [index in TupleKeys<TupleT>] : SelectTupleElementToColumn<TupleT[index]>
        } &
        { length : TupleLength<TupleT> } &
        //HACK
        (AnyColumn)[] &
        { "0" : SelectTupleElementToColumn<TupleT[0]> }
    >
);

export type SelectTupleElementToReferences<ElementT extends AnySelectTupleElement> = (
    ElementT extends IColumnExpr<any, infer TableNameT, infer NameT, infer TypeT> ?
    ColumnToReference<IColumn<TableNameT, NameT, TypeT>> :
    ElementT extends AnyColumn ?
    ColumnToReference<ElementT> :
    ElementT extends {
        [name : string] : AnyColumn
    } ?
    (
        ElementT[keyof ElementT] extends IColumn<infer TableNameT, any, any> ?
            {
                [k in TableNameT] : ElementT
            } :
            {}
    ) :
    {}
);
export type SelectTupleToReferencesInner<
    TupleT extends Tuple<AnySelectTupleElement>,
    K extends string
> = (
    TupleT extends {[k in K]:infer ElementT} ?
        SelectTupleElementToReferences<ElementT> :
        {}
);
/*
function gen (max) {
	const base = [];
	for (let i=0; i<=max; ++i) {
		base.push(`SelectTupleToReferencesInner<TupleT, "${i}">`);
	}
	return base.join(" &\n    ");
}

gen(50)
*/
export type SelectTupleToReferences<
    TupleT extends Tuple<AnySelectTupleElement>
> = (
    //TODO More elements
    //TODO Figure out a TupleReduce type
    SelectTupleToReferencesInner<TupleT, "0"> &
    SelectTupleToReferencesInner<TupleT, "1"> &
    SelectTupleToReferencesInner<TupleT, "2"> &
    SelectTupleToReferencesInner<TupleT, "3"> &
    SelectTupleToReferencesInner<TupleT, "4"> &
    SelectTupleToReferencesInner<TupleT, "5"> &
    SelectTupleToReferencesInner<TupleT, "6"> &
    SelectTupleToReferencesInner<TupleT, "7"> &
    SelectTupleToReferencesInner<TupleT, "8"> &
    SelectTupleToReferencesInner<TupleT, "9"> &
    SelectTupleToReferencesInner<TupleT, "10"> &
    SelectTupleToReferencesInner<TupleT, "11"> &
    SelectTupleToReferencesInner<TupleT, "12"> &
    SelectTupleToReferencesInner<TupleT, "13"> &
    SelectTupleToReferencesInner<TupleT, "14"> &
    SelectTupleToReferencesInner<TupleT, "15"> &
    SelectTupleToReferencesInner<TupleT, "16"> &
    SelectTupleToReferencesInner<TupleT, "17"> &
    SelectTupleToReferencesInner<TupleT, "18"> &
    SelectTupleToReferencesInner<TupleT, "19"> &
    SelectTupleToReferencesInner<TupleT, "20"> &
    SelectTupleToReferencesInner<TupleT, "21"> &
    SelectTupleToReferencesInner<TupleT, "22"> &
    SelectTupleToReferencesInner<TupleT, "23"> &
    SelectTupleToReferencesInner<TupleT, "24"> &
    SelectTupleToReferencesInner<TupleT, "25"> &
    SelectTupleToReferencesInner<TupleT, "26"> &
    SelectTupleToReferencesInner<TupleT, "27"> &
    SelectTupleToReferencesInner<TupleT, "28"> &
    SelectTupleToReferencesInner<TupleT, "29"> &
    SelectTupleToReferencesInner<TupleT, "30"> &
    SelectTupleToReferencesInner<TupleT, "31"> &
    SelectTupleToReferencesInner<TupleT, "32"> &
    SelectTupleToReferencesInner<TupleT, "33"> &
    SelectTupleToReferencesInner<TupleT, "34"> &
    SelectTupleToReferencesInner<TupleT, "35"> &
    SelectTupleToReferencesInner<TupleT, "36"> &
    SelectTupleToReferencesInner<TupleT, "37"> &
    SelectTupleToReferencesInner<TupleT, "38"> &
    SelectTupleToReferencesInner<TupleT, "39"> &
    SelectTupleToReferencesInner<TupleT, "40"> &
    SelectTupleToReferencesInner<TupleT, "41"> &
    SelectTupleToReferencesInner<TupleT, "42"> &
    SelectTupleToReferencesInner<TupleT, "43"> &
    SelectTupleToReferencesInner<TupleT, "44"> &
    SelectTupleToReferencesInner<TupleT, "45"> &
    SelectTupleToReferencesInner<TupleT, "46"> &
    SelectTupleToReferencesInner<TupleT, "47"> &
    SelectTupleToReferencesInner<TupleT, "48"> &
    SelectTupleToReferencesInner<TupleT, "49"> &
    SelectTupleToReferencesInner<TupleT, "50">
);

export type ReplaceColumnOfSelectTupleElement<
    ElementT extends AnySelectTupleElement,
    TableNameT extends string,
    NameT extends string,
    NewTypeT
> = (
    ElementT extends IColumnExpr<infer UsedReferencesT, TableNameT, NameT, any> ?
    IColumnExpr<
        //TODO This should also have its columns replaced
        //For now, it *appears* harmless...
        UsedReferencesT,
        TableNameT,
        NameT,
        NewTypeT
    > :
    ElementT extends IColumn<TableNameT, NameT, any> ?
    IColumn<TableNameT, NameT, NewTypeT> :
    ElementT extends {
        [name : string] : AnyColumn
    } ?
    ReplaceColumnOfReference<
        {
            [table in TableNameT] : ElementT
        },
        TableNameT,
        NameT,
        NewTypeT
    >[TableNameT] :
    ElementT
);
export type ReplaceColumnOfSelectTuple<
    TupleT extends Tuple<AnySelectTupleElement>,
    TableNameT extends string,
    NameT extends string,
    NewTypeT
> = (
    TupleT[TupleKeys<TupleT>] extends AnySelectTupleElement ?
        (
            {
                [k in TupleKeys<TupleT>] : (
                    TupleT[k] extends AnySelectTupleElement ?
                        ReplaceColumnOfSelectTupleElement<
                            TupleT[k],
                            TableNameT,
                            NameT,
                            NewTypeT
                        > :
                        never
                )
            } &
            { length : TupleLength<TupleT> } &
            ReplaceColumnOfSelectTupleElement<
                TupleT[TupleKeys<TupleT>],
                TableNameT,
                NameT,
                NewTypeT
            >[] &
            {
                "0" : ReplaceColumnOfSelectTupleElement<
                    TupleT[0],
                    TableNameT,
                    NameT,
                    NewTypeT
                >
            }
        ) :
        (never)
);

export type JoinToSelect<JoinT extends AnyJoin> = (
    JoinT["nullable"] extends true ?
        (
            {
                [name in JoinT["columnReferences"]] : (
                    JoinT["columnReferences"][name]|null
                )
            }
        ) :
        (
            JoinT["columnReferences"]
        )
);
export type JoinTupleToSelectTuple<JoinTupleT extends Tuple<AnyJoin>> = (
    JoinTupleT[TupleKeys<JoinTupleT>] extends AnyJoin ?
        (
            {
                [index in TupleKeys<JoinTupleT>] : (
                    JoinTupleT[index] extends AnyJoin ?
                        JoinToSelect<JoinTupleT[index]> :
                        never
                )
            } &
            { "0" : JoinToSelect<JoinTupleT[0]> } &
            { length : TupleLength<JoinTupleT> } &
            JoinToSelect<JoinTupleT[TupleKeys<JoinTupleT>]>[]
        ) :
        (never)
);
