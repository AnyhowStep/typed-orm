import * as sd from "schema-decorator";
import {ColumnReferences, PartialColumnReferences} from "./column-references";
import {Querify} from "./querify";
import {IColumn} from "./column";
import {ISelectBuilder} from "./select-builder";
import {Tuple} from "./tuple";
import {ToPartialColumnReferences, ColumnOfReferences} from "./column-references-operation";


export interface IColumnExpr<
    UsedReferencesT extends PartialColumnReferences,
    TableNameT extends string,
    NameT extends string,
    TypeT
> extends Querify {
    readonly usedReferences : UsedReferencesT;
    readonly table : TableNameT;
    readonly name  : NameT;
    readonly assertDelegate : sd.AssertDelegate<TypeT>;
}

export interface IExpr<
    UsedReferencesT extends PartialColumnReferences,
    TypeT
> extends Querify {
    readonly usedReferences : UsedReferencesT;
    readonly assertDelegate : sd.AssertDelegate<TypeT>;

    as<AliasT extends string>(alias : AliasT) : IColumnExpr<
        UsedReferencesT,
        "__expr",
        AliasT,
        TypeT
    >;
}

export type ValueQueryTupleElement<ColumnReferencesT extends ColumnReferences> = (
    IColumnExpr<
        ToPartialColumnReferences<ColumnReferencesT>,
        "__expr",
        any,
        any
    > |
    ColumnOfReferences<ColumnReferencesT>
);
export type AnyValueQueryTupleElement = ValueQueryTupleElement<any>;

export type ValueQueryTupleElementType<SelectTupleElementT extends AnyValueQueryTupleElement> = (
    SelectTupleElementT extends IColumnExpr<
        any,
        any,
        any,
        infer TypeT
    > ?
    TypeT :
    SelectTupleElementT extends IColumn<any, any, infer TypeT> ?
    TypeT :
    never
);

export type SelectBuilderValueQuery<TypeT> = ISelectBuilder<{
    hasSelect : true,
    hasUnion : any,
    columnReferences : any,
    joins : any,
    selectReferences : any,
    selectTuple : (
        Tuple<ValueQueryTupleElement<any>> &
        { length : 1 } &
        {
            "0": (
                IColumnExpr<
                    any,
                    "__expr",
                    any,
                    TypeT
                > |
                IColumn<any, any, TypeT>
            )
        }
    ),
    aggregateCallback : any,
}>;

export type AllowedExprConstants = number|string|boolean|Date|null|undefined;
export type RawExpr<TypeT> = (
    (
        //TODO `undefined` constant should be mapped to `null`, maybe; unsure
        TypeT extends AllowedExprConstants ?
            TypeT :
            never
    )|
    IExpr<any, TypeT>|
    IColumn<any, any, TypeT>|
    SelectBuilderValueQuery<TypeT>
);
export type RawExprNoUsedRef<TypeT> = (
    (
        //TODO `undefined` constant should be mapped to `null`, maybe; unsure
        TypeT extends AllowedExprConstants ?
            TypeT :
            never
    )|
    IExpr<{}, TypeT>|
    IColumn<any, any, TypeT>|
    SelectBuilderValueQuery<TypeT>
);
