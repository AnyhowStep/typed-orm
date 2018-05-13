import {PartialColumnReferences} from "./column-references";
import {Querify} from "./querify";
import {IColumn} from "./column";

export interface IColumnExpr<
    UsedReferencesT extends PartialColumnReferences,
    TableNameT extends string,
    NameT extends string
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
